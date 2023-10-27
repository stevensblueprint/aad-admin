import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {Picsum} from "picsum-photos"

import { env } from "~/env.mjs";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const prismaAdapter = PrismaAdapter(db);

const credentialsAuthAvailable = () => process.env.NODE_ENV !== "production";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {},
  adapter: {
    ...prismaAdapter,
    async createUser(user) {
      if (!user.name || !user.email) {
        throw new Error("Missing name");
      }
      return db.user.create({
        data: {
          ...user,
          name: user.name,
          email: user.email,
          emailVerified: new Date(Date.now()),
          image: Picsum.url({height: 128, cache: false}),
        },
      });
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    ... credentialsAuthAvailable() ? [
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
          return user;
        },
      })
    ] : [],
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
