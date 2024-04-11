import { type ReactElement } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

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
                <TableCell>{form.formSchema}</TableCell>
                <TableCell>{form.uiSchema}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

Forms.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

Forms.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Forms;
