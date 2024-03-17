import {
  FormBuilder,
  PredefinedGallery,
} from "@ginkgo-bioworks/react-json-schema-form-builder";
import { useState } from "react";
import { type UISchemaElement } from "@jsonforms/core";

// interface FormProps {
//   schema: object;
//   uischema: UISchemaElement;
// }

export default function View() {
  const [schema, setSchema] = useState("{}");
  const [uischema, setUiSchema] = useState("{}");
  return (
    <div>
      <FormBuilder
        schema={schema}
        uischema={uischema}
        onChange={(newSchema, newUiSchema) => {
          setSchema(newSchema);
          setUiSchema(newUiSchema);
        }}
      />
      <PredefinedGallery
        schema={schema}
        uischema={uischema}
        onChange={(newSchema, newUiSchema) => {
          setSchema(newSchema);
          setUiSchema(newUiSchema);
        }}
      />
    </div>
  );
}
