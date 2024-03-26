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

  getByRole: protectedProcedure
    .input(z.object({ role: z.string() }))
    .query(async ({ input }) => {
      return db.profile.findMany({
        where: {
          user: {
            roleName: input.role,
          },
        },
        include: {
          user: true,
        },
      });
    }),

  updateProfile: protectedProcedure
    .input(
      z
        .object({
          name: z.string().min(1),
          emailAddress: z.string().email(),
          dateOfBirth: z.string().min(1),
          biography: z.string().min(1),
          selectedUniversity: z.string().min(1),
          topIndustries: z.array(z.string()).min(1),
        })
        .partial(),
    )
    .mutation(async ({ input, ctx }) => {
      //Check if the user exits before trying to modify their information
      const profileExits = await db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!profileExits) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: '"{input.name}" not found in database',
        });
      }
      //Update the user's information
      try {
        return await db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            name: input.name,
            email: input.emailAddress,
            profile: {
              update: {
                where: {
                  userId: ctx.session.user.id,
                },
                data: {
                  dateOfBirth: input.dateOfBirth,
                  bio: input.biography,
                  selectedUniversity: input.selectedUniversity,
                  topIndustries: input.topIndustries,
                },
              },
            },
          },
          include: {
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
});
