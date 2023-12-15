import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { UISchemaElement } from "@jsonforms/core";
import StarRatingControl from "./StarRatingControl";
import StarRatingControlTester from "./StarRatingControlTester";

interface FormProps {
  schema: object;
  uischema: UISchemaElement;
  initialData: unknown;
}

// Generic Form Component that can be customized off of JSON schemas
export default function Form({ schema, uischema, initialData }: FormProps) {
  const [formData, setFormData] = useState(initialData);

  // ADD CUSTOM RENDERERS FOR EACH COMPONENT HERE
  const renderers = [
    ...materialRenderers,
    { tester: StarRatingControlTester, renderer: StarRatingControl },
  ];

  const updateDataOnChange = ({ data }: { data: unknown }) => setFormData(data);

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={formData}
      renderers={renderers}
      cells={materialCells}
      onChange={updateDataOnChange}
      validationMode={"ValidateAndShow"}
    />
  );
}
