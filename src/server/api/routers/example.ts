import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),

  getSecretMessage: protectedProcedureWithRoles(["admin"]).query(() => {
    return "you can now see this secret message!";
  }),
});
