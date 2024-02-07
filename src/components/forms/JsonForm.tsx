import { useState } from "react";
import { JsonForms, type JsonFormsReactProps } from "@jsonforms/react";
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
import { type ErrorObject } from "ajv";
import { type JSONObject } from "superjson/dist/types";

interface FormProps {
  schema: object;
  uischema: UISchemaElement;
  initialData: unknown;
  onSubmit: (data: JSONObject) => void;
}

// Generic Form Component that can be customized off of JSON schemas
export default function JsonForm({
  schema,
  uischema,
  initialData,
  onSubmit,
}: FormProps) {
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState<
    ErrorObject<string, Record<string, unknown>, unknown>[] | undefined
  >();
  const [submitted, setSubmitted] = useState(false);

  // ADD CUSTOM RENDERERS FOR EACH COMPONENT HERE
  const renderers: JsonFormsRendererRegistryEntry[] = [
    ...materialRenderers,
    { tester: StarRatingControlTester, renderer: StarRatingControl },
  ];

  const updateDataOnChange: JsonFormsReactProps["onChange"] = ({
    data,
    errors,
  }) => {
    setFormData(data);
    setFormErrors(errors);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (formErrors?.length === 0) {
      onSubmit(formData as JSONObject);
    }
  };

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
      <Button onClick={handleSubmit}>Submit</Button>
    </Card>
  );
}
