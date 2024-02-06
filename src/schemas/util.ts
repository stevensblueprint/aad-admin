import { readdir } from "fs/promises";

export const getSchemas = async () => {
  // TODO: this can maybe be moved somewhere more accessible or available
  // to be uploaded to from the site
  const files = await readdir("src/schemas", { withFileTypes: true });
  return files.filter((fd) => fd.isDirectory()).map((fd) => fd.name);
};
