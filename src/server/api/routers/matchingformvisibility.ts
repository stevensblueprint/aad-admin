import { TRPCError } from "@trpc/server";
import { get } from "http";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";

export const matchingFormVisibilityRouter = createTRPCRouter({
  openForm: protectedProcedure
  .input(z.object({ userId: z.string(), formId: z.string() }))
  .mutation(async ({ input }) => {
    const user = await db.user.findUnique({
      where: {
        id: input.userId,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    if (user.roleName !== "ADMIN") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized to open form",
      });
    }
    const form = await db.matchingFormVisibility.update({
      where: {
        id: input.formId,
      },
      data: {
        isOpen: true,
        lastUpdated: new Date(),
        lastUpdatedById: input.userId,
      },
    });
    return form;
  }
  ),
  closeForm: protectedProcedure
  .input(z.object({ userId: z.string(), formId: z.string() }))
  .mutation(async ({ input }) => {
    const user = await db.user.findUnique({
      where: {
        id: input.userId,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    if (user.roleName !== "ADMIN") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized to close form",
      });
    }
    const form = await db.matchingFormVisibility.update({
      where: {
        id: input.formId,
      },
      data: {
        isOpen: false,
        lastUpdated: new Date(),
        lastUpdatedById: input.userId,
      },
    });
    return form;
  }
  ),
  getForm: protectedProcedure
  .input(z.object({ formId: z.string() }))
  .query(async ({ input }) => {
    const form = await db.matchingFormVisibility.findUnique({
      where: {
        id: input.formId,
      },
    });
    if (!form) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Form not found",
      });
    }
    return form;
  }
  ),
