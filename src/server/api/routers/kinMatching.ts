import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "~/server/api/trpc";

// be able to open, close, update form announcement

export const kinMatchingRouter = createTRPCRouter({
  // adds new row to kinMatching table
  createNewCycle: protectedProcedureWithRoles(["ADMIN"])
    .input(
      z.object({
        cycleName: z.string(),
        dueDate: z.date(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const newMatchingCycle = await ctx.db.kinMatching.create({
        data: {
          cycleName: input.cycleName,
          dueDate: input.dueDate,
        },
      });
      return newMatchingCycle;
    }),

  //   openForm: protectedProcedureWithRoles(["ADMIN"])
  openForm: publicProcedure
    .input(
      z.object({
        id: z.number(),
        cycleName: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const kinMatchingCycle = await ctx.db.kinMatching.findFirst({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
      });

      if (!kinMatchingCycle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kin Matching Cycle not found. Incorrect cycle name or id",
        });
      }

      const updatedKinMatching = await ctx.db.kinMatching.update({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
        data: {
          isOpen: true,
        },
      });

      return updatedKinMatching;
    }),

  closeForm: publicProcedure
    .input(
      z.object({
        id: z.number(),
        cycleName: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const kinMatchingCycle = await ctx.db.kinMatching.findFirst({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
      });

      if (!kinMatchingCycle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kin Matching Cycle not found. Incorrect cycle name or id",
        });
      }

      const updatedKinMatching = await ctx.db.kinMatching.update({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
        data: {
          isOpen: false,
        },
      });

      return updatedKinMatching;
    }),

  archiveForm: publicProcedure
    .input(
      z.object({
        id: z.number(),
        cycleName: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      const kinMatchingCycle = ctx.db.kinMatching.findFirst({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
      });

      if (!kinMatchingCycle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kin Matching Cycle not found. Incorrect cycle name or id",
        });
      }

      const updatedKinMatching = ctx.db.kinMatching.update({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
        data: {
          archived: true,
        },
      });

      return updatedKinMatching;
    }),

  unarchiveForm: publicProcedure
    .input(
      z.object({
        id: z.number(),
        cycleName: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      const kinMatchingCycle = ctx.db.kinMatching.findFirst({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
      });

      if (!kinMatchingCycle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Kin Matching Cycle not found. Incorrect cycle name or id",
        });
      }

      const updatedKinMatching = ctx.db.kinMatching.update({
        where: {
          id: input.id,
          cycleName: input.cycleName,
        },
        data: {
          archived: false,
        },
      });

      return updatedKinMatching;
    }),

  getKinMatchingForms: publicProcedure.query(({ ctx: { db } }) => {
    return db.kinMatching.findMany({
      orderBy: [
        {
          isOpen: "desc",
        },
      ],
    });
  }),

  getOpenKinMatchingForms: publicProcedure.query(({ ctx: { db } }) => {
    return db.kinMatching.findMany({
      where: {
        isOpen: true,
        archived: false,
      },
    });
  }),
});
