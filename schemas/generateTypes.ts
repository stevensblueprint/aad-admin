import { compileFromFile } from "json-schema-to-typescript";
import { readdir, writeFile } from "fs/promises";

const forms = await readdir("schemas", { withFileTypes: true });
await Promise.all(
  forms.map(async (fd) => {
    if (!fd.isDirectory()) return;
    const { name } = fd;
    const schema = await compileFromFile(`schemas/${name}/form.schema.json`);
    await writeFile(`schemas/${name}/form.types.ts`, schema);
  }),
);

// you can generate the uiSchema by running the following code
// import intakeSchema from "./menteeIntake/form.schema.json" assert {type: "json"}
// await writeFile("./uischema.json", JSON.stringify(Generate.uiSchema(intakeSchema), null, 2))
