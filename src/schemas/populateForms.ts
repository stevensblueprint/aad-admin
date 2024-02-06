import { readFile } from "fs/promises";
import { db } from "../server/db";
import { getSchemas } from "./util";

const schemas = await getSchemas();
await Promise.all(
  schemas.map(async (schema) => {
    const formSchema = (
      await readFile(`src/schemas/${schema}/form.schema.json`, {
        encoding: "utf-8",
      })
    ).toString();
    const uiSchema = (
      await readFile(`src/schemas/${schema}/uiSchema.json`, {
        encoding: "utf-8",
      })
    ).toString();
    //TODO: decide if need some versioning for the schemas
    // do this to get rid of whitespace
    const params = {
      name: schema,
      formSchema: JSON.stringify(JSON.parse(formSchema)),
      uiSchema: JSON.stringify(JSON.parse(uiSchema)),
    };
    await db.form.upsert({
      create: {
        ...params,
      },
      update: {
        ...params,
      },
      where: {
        name: schema,
      },
    });
  }),
);
