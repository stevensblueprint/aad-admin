import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { type JsonObject } from "@prisma/client/runtime/library";

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
          message: `Error retrieving form with the name '${formName}': ${error}`,
        });
      }
    }),
  addForm: protectedProcedure // Admin Protected Function
    .input(
      z.object({
        id: z.string(),
        formSchema: z.string(),
        uiSchema: z.string(),
      }),
    )
    .mutation(async ({ input: { id, formSchema, uiSchema }, ctx: { db } }) => {
      // TODO: Change this to create a collection and cascade to the form object
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
          message: `Failed to create form with ID '${id}': ${error}`,
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
          message: `Failed to delete form with ID '${id}': ${error}`,
        });
      }
    }),
  /**
   * TODO: This method should be called/coupled with an interactive JSON Editor that 
   * lets Admins change the schema and UI schema of the chosen form
   * editForm: publicProcedure
    .input(z.object({id : z.string(), newFormSchema: z.string(), newUiSchema: z.string()}))
    .mutation(async ({ input: {id, newFormSchema, newUiSchema }, ctx: {db}}) => {
    }),
   */
});
