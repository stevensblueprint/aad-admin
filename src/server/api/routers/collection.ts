import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createCollectionSchema } from "../../../components/admin/CollectionForm";
import { db } from "../../db";
import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "../trpc";

export const collectionRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(createCollectionSchema)
    .mutation(
      async ({ input: { name, instructions, formName, roles, isOpen } }) => {
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
              formName,
              instructions,
              isOpen,
              roles: {
                connect: roles.map((roleName) => ({ roleName })),
              },
            },
          });
          return collection;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error creating collection",
          });
        }
      },
    ),
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
  getCollections: protectedProcedureWithRoles(["ADMIN"]).query(
    async ({ ctx: { db } }) => {
      const collections = db.collection.findMany({
        include: {
          roles: true,
        },
      });
      return collections;
    },
  ),
  getCollectionsWithSubmissions: protectedProcedureWithRoles(["ADMIN"]).query(
    async ({ ctx: { db } }) => {
      const collections = db.collection.findMany({
        include: {
          roles: true,
          submissions: {
            include: {
              submittedBy: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
      });
      return collections;
    },
  ),
  getSubmissions: publicProcedure
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ input: { collectionId } }) => {
      return db.submission.findMany({
        where: {
          collectionId,
        },
      });
    }),
  getMyCollectionSubmission: protectedProcedureWithRoles(["MENTEE", "MENTOR"])
    .input(z.object({ collectionId: z.string() }))
    .query(async ({ input: { collectionId }, ctx: { session } }) => {
      const collection = await db.collection.findFirst({
        where: {
          id: collectionId,
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
      const submission = await db.submission.findFirst({
        where: {
          collectionId,
          submittedById: session.user.id,
        },
      });
      return {
        collection,
        submission,
      };
    }),

  getAllCollectionIds: publicProcedure.query(async () => {
    return db.collection.findMany({
      select: {
        id: true,
      },
    });
  }),
});
