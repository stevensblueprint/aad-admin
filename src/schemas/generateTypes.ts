import { readdir, writeFile } from "fs/promises";
import { compileFromFile } from "json-schema-to-typescript";

const forms = await readdir("src/schemas", { withFileTypes: true });
await Promise.all(
  forms.map(async (fd) => {
    if (!fd.isDirectory()) return;
    const { name } = fd;
    const schema = await compileFromFile(
      `src/schemas/${name}/form.schema.json`,
    );
    await writeFile(`src/schemas/${name}/form.types.ts`, schema);
  }),
);

// you can generate the uiSchema by running the following code
// import { Generate } from "@jsonforms/core";
// import formSchema from "./testing/form.schema.json" assert { type: "json" };
// await writeFile(
//   "./uiSchema.json",
//   JSON.stringify(Generate.uiSchema(formSchema), null, 2),
// );
