import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import {
  type JsonFormsRendererRegistryEntry,
  type UISchemaElement,
} from "@jsonforms/core";
import StarRatingControl from "./StarRatingControl";
import StarRatingControlTester from "./StarRatingControlTester";
import { Button, Card } from "@mui/material";

interface FormProps {
  schema: object;
  uischema: UISchemaElement;
  initialData: unknown;
}

// Generic Form Component that can be customized off of JSON schemas
export default function Form({ schema, uischema, initialData }: FormProps) {
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);

  // ADD CUSTOM RENDERERS FOR EACH COMPONENT HERE
  const renderers: JsonFormsRendererRegistryEntry[] = [
    ...materialRenderers,
    { tester: StarRatingControlTester, renderer: StarRatingControl },
  ];

  const updateDataOnChange = ({ data }: { data: unknown }) => setFormData(data);

  return (
    <Card>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={renderers}
        cells={materialCells}
        onChange={updateDataOnChange}
        validationMode={submitted ? "ValidateAndShow" : "ValidateAndHide"}
      />
      <Button onClick={() => setSubmitted(true)}>Submit</Button>
    </Card>
  );
}
