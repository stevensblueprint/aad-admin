import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { type JsonObject } from "@prisma/client/runtime/library";
import { db } from "~/server/db";

// TODO: Fix typying lint issues

const ajv = new Ajv();
addFormats(ajv);

export const formRouter = createTRPCRouter({
  getForms: publicProcedure
    .input(z.object({ includeSchemas: z.boolean().optional() }))
    .query(({ input: { includeSchemas = false }, ctx: { db } }) => {
      return db.form.findMany({
        select: {
          name: true,
          formSchema: includeSchemas,
          uiSchema: includeSchemas,
        },
      });
    }),
  submitForm: publicProcedure // FIXME: Not executing in tRPC panel
    .input(
      z.object({
        data: z.record(z.unknown()),
        collectionId: z.string(),
      }),
    )
    .mutation(
      async ({ input: { data, collectionId }, ctx: { db, session } }) => {
        const collection = await db.collection.findUnique({
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
        const formSchema = JSON.parse(collection.form.formSchema);
        const valid = ajv.compile(formSchema)(data);
        if (!valid) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: ajv.errorsText(ajv.errors),
          });
        }
        await db.submission.create({
          data: {
            data: {
              ...(data as JsonObject),
            },
            collectionId,
            submittedById: session?.user.id,
          },
        });
      },
    ),
  addForm: publicProcedure.mutation(
    async ({
      input: { _formId, _formSchema, _uiSchema },
      ctx: { db, session },
    }) => {
      await db.form.create({
        formId: _formId,
        formSchema: _formSchema,
        uiSchema: _uiSchema,
      });
      // model Form {
      //   name       String       @id @unique
      //   formSchema String
      //   uiSchema   String
      //   Collection Collection[]
      // } //FIXME: Does this need a submittedById?
      return { message: "Form Successfully Added" };
    },
  ),
  // deleteForm: publicProcedure.input // Want a Mutation to delete: https://trpc.io/docs/server/procedures
});
