import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "~/server/api/trpc";

// be able to open, close, update form announcement

export const kinMatchingRouter = createTRPCRouter({
  updateForm: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx: { db } }) => {
    return db.example.findMany();
  }),

  openForm: protectedProcedureWithRoles(["ADMIN"]).query(({ ctx: { db } }) => {
    return db.announcement.findMany();;
  }),

	closeForm: protectedProcedureWithRoles(["ADMIN"]).query(() => {
		return "you can now see this secret message!";
	}),
});
