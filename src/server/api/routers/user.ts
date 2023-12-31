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
});
