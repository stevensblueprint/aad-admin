import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../db";
import { TRPCError } from "@trpc/server";

export const collectionRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(
      z.object({
        formName: z.string(),
        // TODO: this should change to visibility, and be an enum
        isPublic: z.boolean(),
        isOpen: z.boolean(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input: { name, formName, isPublic, isOpen } }) => {
      try {
        const collection = await db.collection.create({
          data: {
            name,
            isPublic,
            isOpen,
            formName,
          },
        });
        return collection;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating collection",
        });
      }
    }),
  getCollectionById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const collection = await db.collection.findUnique({
        where: {
          id,
        },
        include: {
          form: true,
        },
      });
      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }
      // TODO: visibility level
      return collection;
    }),
});
