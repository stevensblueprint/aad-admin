import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { type UISchemaElement } from "@jsonforms/core";

interface FormProps {
  schema: object;
  uischema: UISchemaElement;
  initialData: unknown;
}

// Generic Form Component that can be customized off of JSON schemas
export default function Form({ schema, uischema, initialData }: FormProps) {
  const [formData, setFormData] = useState(initialData);

  const onChange = ({ data }: { data: unknown }) => setFormData(data); // Specifying the type of data

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={formData}
      renderers={materialRenderers}
      onChange={onChange}
    />
  );
}
