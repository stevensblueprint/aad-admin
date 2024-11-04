import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "~/server/api/trpc";

export const announcementRouter = createTRPCRouter({
  createAnnouncement: protectedProcedureWithRoles(["ADMIN"])
    .input(
      z.object({
        message: z.string(),
        type: z.enum(["info", "warning", "error"]).optional(),
        expirationDate: z.date().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const newAnnouncement = await ctx.db.announcement.create({
        data: {
          message: input.message,
          type: input.type,
          expirationDate: input.expirationDate,
        },
      });
      return newAnnouncement;
    }),

  getActiveAnnouncements: publicProcedure.query(({ ctx: { db } }) => {
    return db.announcement.findMany({
      where: {
        active: true,
        OR: [
          {
            expirationDate: {
              gte: new Date(),
            },
          },
          {
            expirationDate: null,
          },
        ],
      },
    });
  }),

  getAnnouncements: publicProcedure.query(({ ctx: { db } }) => {
    return db.announcement.findMany();
  }),
});
