import { createTRPCRouter } from "~/server/api/trpc";
import { collectionRouter } from "./routers/collection";
import { exampleRouter } from "./routers/example";
import { formRouter } from "./routers/form";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  collection: collectionRouter,
  form: formRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
