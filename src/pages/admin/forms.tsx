import { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { api } from "~/utils/api";
import { type UISchemaElement } from "@jsonforms/core";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css"; // Keep this
import DefaultLoadingPage from "../../components/loading/loading";
import ErrorPage from "../../components/error/error";
import JsonForm from "~/components/forms/JsonForm";

const Forms = () => {
  // const utils = api.useUtils();
  const [formSchema, setFormSchema] = useState<object>({});
  const [uiSchema, setUiSchema] = useState<UISchemaElement>({
    type: "VerticalLayout",
  });
  const { data, error, isLoading } = api.form.getForms.useQuery({
    includeSchemas: true,
  });

  // const { mutateAsync } = api.form.editForm.useMutation({
  //   onSuccess: async () => {
  //     await utils.form.getForms.invalidate();
  //   },
  // });

  // const onSubmit: SubmitHandler<CreateCollectionData> = async (data) => {
  //   await mutateAsync({
  //     ...data,
  //     roles: data.roles.map((role) => role.toUpperCase()),
  //   });
  // };

  const handleRowClick = (
    clickedFormSchema: object,
    clickedUiSchema: UISchemaElement,
  ) => {
    setFormSchema(clickedFormSchema);
    setUiSchema(clickedUiSchema);
  };

  // Extract the JSON and check the proper type from database row
  // FIXME: Should uiSchema and formSchema just be stored as JSON in the database instead of strings?
  const parseJSON = <T,>(jsonString: string, defaultValue: T): T => {
    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error("Error parsing JSON", error);
      return defaultValue;
    }
  };

  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <Container className="mt-4">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Form Name</TableCell>
              <TableCell>Form Schema</TableCell>
              <TableCell>Form UI Schema</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((form) => (
              <TableRow
                key={form.name}
                onClick={() =>
                  handleRowClick(
                    parseJSON<object>(form.formSchema, {}),
                    parseJSON<UISchemaElement>(form.uiSchema, {
                      type: "VerticalLayout",
                    }),
                  )
                }
              >
                <TableCell>{form.name}</TableCell>
                {/*
                https://github.com/YYsuni/react18-json-view?tab=readme-ov-file 
                https://react18-json-view.vercel.app/?path=/docs/editable--docs
                TODO: onEdit, onAdd, onDelete should all call the editForm procedure
                */}
                <TableCell>
                  <JsonView
                    src={() => parseJSON<object>(form.formSchema, {})}
                    editable={true}
                  />
                </TableCell>
                <TableCell>
                  <JsonView
                    src={() =>
                      parseJSON<UISchemaElement>(form.uiSchema, {
                        type: "VerticalLayout",
                      })
                    }
                    editable={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <JsonForm schema={formSchema} uischema={uiSchema} initialData={{}} />
    </Container>
  );
};

export default Forms;
