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

import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const Forms = () => {
  const utils = api.useUtils();
  const { data, error, isLoading } = api.form.getForms.useQuery({
    includeSchemas: true,
  });

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
                {/*https://github.com/YYsuni/react18-json-view?tab=readme-ov-file */}
                <TableCell>
                  <JsonView src={() => JSON.parse(form.formSchema)} />
                </TableCell>
                <TableCell>
                  <JsonView src={() => JSON.parse(form.uiSchema)} />
                </TableCell>
                {/* <TableCell>{form.formSchema}</TableCell>
                <TableCell>{form.uiSchema}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Forms;
