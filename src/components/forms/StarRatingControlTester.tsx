import { rankWith, scopeEndsWith } from "@jsonforms/core";

export default rankWith(
  3,
  scopeEndsWith("rating"), // The UI schema element in schema.json is bound to a path that ends with 'rating'
);
