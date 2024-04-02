import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../db";
import { TRPCError } from "@trpc/server";
import { createCollectionSchema } from "../../../components/admin/CollectionForm";

export const collectionRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(createCollectionSchema)
    .mutation(async ({ input: { name, formName, isPublic, isOpen } }) => {
      try {
        const form = await db.form.findFirst({
          where: {
            name: formName,
          },
        });
        if (!form) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found",
          });
        }
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
  getCollections: publicProcedure.query(async () => {
    return db.collection.findMany();
  }),
  getSubmissions: publicProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ input: { collectionId } }) => {
      return db.submission.findMany({
        where: {
          collectionId,
        },
      });
    }),

  getCollectionWithSubmissionsById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const collection = await db.collection.findUnique({
        where: {
          id,
        },
        include: {
          Submission: {
            include: {
              submittedBy: true,
              collection: true,
            },
          },
        }, // Include submissions associated with this collection
      });
      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }
      return collection;
    }),
});
