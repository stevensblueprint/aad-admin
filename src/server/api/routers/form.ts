import { type JsonObject } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
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
  getForm: publicProcedure
    .input(
      z.object({
        formName: z.string(),
      }),
    )
    .query(async ({ input: { formName }, ctx: { db } }) => {
      try {
        const form = await db.form.findUnique({
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

        return form;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error retrieving form with the name '${formName}': ${String(error)}`,
        });
      }
    }),
  submitForm: publicProcedure
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
        const submission = await db.submission.findFirst({
          where: {
            collectionId,
            submittedById: session?.user.id,
          },
        });
        if (submission) {
          await db.submission.update({
            data: {
              data: data as JsonObject,
            },
            where: {
              id: submission.id,
            },
          });
        } else {
          await db.submission.create({
            data: {
              data: data as JsonObject,
              submittedById: session?.user.id,
              collectionId,
            },
          });
        }
      },
    ),
  createForm: protectedProcedure // Admin Protected Function
    .input(
      z.object({
        id: z.string(),
        formSchema: z.string(),
        uiSchema: z.string(),
      }),
    )
    .mutation(async ({ input: { id, formSchema, uiSchema }, ctx: { db } }) => {
      const formExists = await db.form.findUnique({ where: { name: id } });

      if (formExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `A form with the id '${id}' already exists.`,
        });
      }

      try {
        await db.form.create({
          data: {
            name: id,
            formSchema: formSchema,
            uiSchema: uiSchema,
          },
        });

        return { message: `Succesfully created form with ID: '${id}'` };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to create form with ID '${id}': ${String(error)}`,
        });
      }
    }),
  deleteForm: protectedProcedure // Admin Protected Function
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { db } }) => {
      const formExists = await db.form.findUnique({ where: { name: id } });

      if (!formExists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `A form with the id '${id}' does not exist.`,
        });
      }

      try {
        await db.form.delete({
          where: {
            name: id,
          },
        });

        return { message: `Form with the id '${id}' successfully deleted.` };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete form with ID '${id}': ${String(error)}`,
        });
      }
    }),
  /**
   * This method should be called/coupled with an interactive JSON Editor that
   * lets Admins change the schema and UI schema of the chosen form
   */
  updateForm: publicProcedure
    .input(
      z.object({
        id: z.string(),
        newFormSchema: z.string(),
        newUiSchema: z.string(),
      }),
    )
    .mutation(
      async ({ input: { id, newFormSchema, newUiSchema }, ctx: { db } }) => {
        const formExists = await db.form.findUnique({ where: { name: id } });

        if (!formExists) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `A form with the id '${id}' does not exist.`,
          });
        }

        try {
          // FIXME: Rewriting the whole json every time seems like an expensive operation, how can we optimize?
          // TODO: When updating the form how does that effect the collections? Should I just leave the original and create a whole
          // separate form with the updated fields?
          const updatedForm = await db.form.update({
            where: {
              name: id,
            },
            data: {
              formSchema: newFormSchema,
              uiSchema: newUiSchema,
            },
          });

          return {
            message: `Form with the id '${id}' successfully updated: ${String(updatedForm)}`,
          };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Failed to delete form with ID '${id}': ${String(error)}`,
          });
        }
      },
    ),
});
