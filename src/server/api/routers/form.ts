import { type JsonObject } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedureWithRoles,
  publicProcedure,
} from "../trpc";
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
    .input(z.object({ formName: z.string() }))
    .query(async ({ input: { formName }, ctx: { db } }) => {
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
      return form;
    }),
  submitForm: protectedProcedureWithRoles(["MENTOR", "MENTEE"])
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
});
