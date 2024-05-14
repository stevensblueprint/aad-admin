import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Cookies from "cookies";
import { randomUUID } from "crypto";
import { type NextApiRequest, type NextApiResponse } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { decode, encode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export type RoleName = "MENTOR" | "MENTEE" | "ADMIN";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      roleName: RoleName;
    };
  }

  interface User {
    roleName: RoleName;
  }
}

// TODO: figure out how to determine which google logins are admins
// this should work in dev and staging environments, process.env.CI is true in GH actions
const credentialsAuthAvailable = () =>
  process.env.NODE_ENV !== "production" || process.env.CI;

const adminEmails = ["rkirk@stevens.edu"];

/**
 * In order to get credential authentication to work with NextAuth sessions,
 * we need to wrap the NextAuth handler with this so we can manually
 * create the session and store in db for credentials logins.
 */
export function requestWrapper(
  req: NextApiRequest,
  res: NextApiResponse,
): [req: NextApiRequest, res: NextApiResponse, opts: NextAuthOptions] {
  const generateSessionToken = () => randomUUID();

  const fromDate = (time: number, date = Date.now()) =>
    new Date(date + time * 1000);

  const adapter = PrismaAdapter(db);

  const opts: NextAuthOptions = {
    cookies: {
      sessionToken: {
        name: "next-auth.session-token",
        options: {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        },
      },
    },
    adapter: {
      ...adapter,
      createUser: async (data) => {
        const roleName = adminEmails.includes(data.email) ? "ADMIN" : "MENTEE";
        const user = await db.user.create({
          data: {
            ...data,
            roleName,
            profile: {
              create: {
                preferredName: data.name,
              },
            },
          },
        });
        return user as { roleName: RoleName } & typeof user;
      },
    },
    callbacks: {
      session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
          session.user.roleName = user.roleName;
        }
        return session;
      },
      async signIn({ user }) {
        // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth?.includes("credentials") &&
          req.method === "POST"
        ) {
          if (user) {
            const sessionToken = generateSessionToken();
            const sessionMaxAge = 60 * 60 * 24 * 30; //30Daysconst sessionMaxAge = 60 * 60 * 24 * 30; //30Days
            const sessionExpiry = fromDate(sessionMaxAge);

            await adapter.createSession!({
              sessionToken: sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            });

            const cookies = new Cookies(req, res);

            cookies.set("next-auth.session-token", sessionToken, {
              expires: sessionExpiry,
            });
          }
        }

        return true;
      },
    },
    jwt: {
      encode: async ({ token, secret, maxAge }) => {
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth.includes("credentials") &&
          req.method === "POST"
        ) {
          const cookies = new Cookies(req, res);
          const cookie = cookies.get("next-auth.session-token");
          if (cookie) return cookie;
          else return "";
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode({ token, secret, maxAge });
      },
      decode: async ({ token, secret }) => {
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth.includes("credentials") &&
          req.method === "POST"
        ) {
          return null;
        }

        // Revert to default behaviour when not in the credentials provider callback flow
        return decode({ token, secret });
      },
    },
    // Configure one or more authentication providers
    debug: true,
    providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
      ...(credentialsAuthAvailable()
        ? [
            CredentialsProvider({
              name: "Credentials",
              credentials: {
                email: {
                  label: "Email",
                  type: "text",
                },
              },
              async authorize(credentials) {
                if (!credentials) {
                  return null;
                }
                const user = await db.user.findFirst({
                  where: {
                    email: credentials.email,
                  },
                });
                if (!user) {
                  return null;
                }
                return user as { roleName: RoleName } & typeof user;
              },
            }),
          ]
        : []),
    ],
  };

  return [req, res, opts];
}

// Next API route example - /pages/api/restricted.ts
export const getServerAuthSession = async (ctx: {
  // req: GetServerSidePropsContext["req"];
  // res: GetServerSidePropsContext["res"];
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return await getServerSession(...requestWrapper(ctx.req, ctx.res));
};
