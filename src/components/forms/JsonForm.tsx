import {
  type JsonFormsRendererRegistryEntry,
  type UISchemaElement,
} from "@jsonforms/core";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms, type JsonFormsReactProps } from "@jsonforms/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { type ErrorObject } from "ajv";
import { useState } from "react";
import { type JSONObject } from "superjson/dist/types";
import StarRatingControl from "./StarRatingControl";
import StarRatingControlTester from "./StarRatingControlTester";

interface FormProps {
  schema: object;
  uischema: UISchemaElement;
  initialData: unknown;
  onSubmit: (data: JSONObject) => void;
}

const formTheme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          gap: "1rem",
        },
      },
    },
  },
});

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
      <CardContent className="p-8">
        <ThemeProvider theme={formTheme}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={formData}
            renderers={renderers}
            cells={materialCells}
            onChange={updateDataOnChange}
            validationMode={submitted ? "ValidateAndShow" : "ValidateAndHide"}
          />
        </ThemeProvider>
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
