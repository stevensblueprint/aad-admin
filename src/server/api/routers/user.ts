import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        return await db.user.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            accounts: true,
            sessions: true,
            profile: true,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: '"{input.id}" not found in database',
        });
      }
    }),

  getAll: protectedProcedure.query(async () => {
    return await db.user.findMany();
  }),

  createUser: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        role: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const existingUser = await db.user.findUnique({
          where: {
            email: input.email,
          },
        });
        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A user with this email already exists.",
          });
        }
        return await db.user.create({
          data: {
            name: input.name,
            email: input.email,
            roleName: input.role,
            profile: {
              create: {
                preferredName: input.name,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user.",
        });
      }
    }),

  getByRole: protectedProcedure
    .input(z.object({ role: z.string() }))
    .query(async ({ input }) => {
      return db.user.findMany({
        where: {
          roleName: input.role,
        },
      });
    }),
  deleteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        return db.user.delete({ where: { id: input.id } });
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User ${input.id} not found in database`,
        });
      }
    }),

  deleteByIds: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      try {
        return db.user.deleteMany({ where: { id: { in: input.ids } } });
      } catch (error) {
        // Convert ids to string for error message
        const ids = input.ids.join(", ");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User ${ids} not found in database`,
        });
      }
    }),
  //Update the user's preferences in their profile, and is used for the matching page
  updatePreferences: protectedProcedure
    .input(
      z.object({
        preferences: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      //Update the user's preferences in their profile
      try {
        return await db.profile.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            preferences: input.preferences,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: '"{ctx.session.user.id}" not found in database',
        });
      }
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        emailAddress: z.string().email(),
        dob: z.string().min(1),
        biography: z.string().min(1),
        selectedUniversity: z.string().min(1),
        topIndustries: z.array(z.string()).min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedUser = await db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            email: input.emailAddress,
            profile: {
              update: {
                where: {
                  userId: ctx.session.user.id,
                },
                data: {
                  preferredName: input.name,
                  dateOfBirth: input.dob,
                  bio: input.biography,
                  university: input.selectedUniversity,
                  industries: input.topIndustries,
                },
              },
            },
          },
          include: {
            profile: true,
          },
        });
        return updatedUser;
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `${ctx.session.user.id} not found in database`,
        });
      }
    }),
});
