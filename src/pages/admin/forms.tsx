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
import "react18-json-view/src/style.css";

const Forms = () => {
  const utils = api.useUtils();
  const { data, error, isLoading } = api.form.getForms.useQuery({
    includeSchemas: true,
  });

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
              <TableRow key={form.name}>
                <TableCell>{form.name}</TableCell>
                {/*
                https://github.com/YYsuni/react18-json-view?tab=readme-ov-file 
                https://react18-json-view.vercel.app/?path=/docs/editable--docs
                */}
                <TableCell>
                  <JsonView
                    src={() => parseJSON<object>(form.formSchema, {})}
                    editable={true}
                  />
                </TableCell>
                <TableCell>
                  <JsonView
                    src={() => parseJSON<UISchemaElement>(form.uiSchema, {})}
                    editable={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Forms;
