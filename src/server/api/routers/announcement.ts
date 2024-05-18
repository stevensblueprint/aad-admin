import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "~/server/api/trpc";

export const announcementRouter = createTRPCRouter({
  createAnnouncement: protectedProcedureWithRoles(["ADMIN"])
    .input(z.object({
      title: z.string(),
      content: z.string(),
      type: z.enum(["info", "warning", "error"]).optional(),
      expirationDate: z.date().optional(),
    }))
    .query(async ({ input, ctx }) => {
      const newAnnouncement = await ctx.db.announcement.create({
        data: {
          title: input.title,
          content: input.content,
          type: input.type,
          expirationDate: input.expirationDate,
        },
      });
      return newAnnouncement;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.announcement.findMany();
  }),
});
