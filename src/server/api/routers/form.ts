import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { type JsonObject } from "@prisma/client/runtime/library";

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
  addForm: publicProcedure
    .input(
      z.object({
        id: z.string(),
        formSchema: z.string(),
        uiSchema: z.string(),
      }),
    )
    .mutation(async ({ input: { id, formSchema, uiSchema }, ctx: { db } }) => {
      await db.form.create({
        data: {
          name: id,
          formSchema: formSchema,
          uiSchema: uiSchema,
        },
      });
      return { message: "Form Successfully Added" }; // FIXME: Check if key exists : try-catch??
    }),
  deleteForm: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { db } }) => {
      await db.form.delete({
        // FIXME: Should check if id exists or does prisma method do this?
        where: {
          name: id,
        },
      });

      return { message: "Form Successfully Deleted" };
    }),
  // editForm: publicProcedure
  //   .input(z.object({id : z.string(), newFormSchema: z.string(), newUiSchema: z.string()}))
  //   .mutation(async ({ input: {id, newFormSchema, newUiSchema }, ctx: {db}}) => {
  // TODO: Incoporate the JSON editors included on the issues tag
  //   }),
});
