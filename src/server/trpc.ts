import { User } from '@prisma/client';
import { initTRPC } from '@trpc/server';

import { db } from "~/server/db";

const t = initTRPC.context<User>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const appRouter = router({
  getById: publicProcedure.query(async (opts) => {
    const userId = opts.ctx.id;
    return db.user.findUnique({
      where: {
        id: userId
      }
    });
  }),

  getAll: publicProcedure.query(() => {
    return db.user.findMany()
  }),
});