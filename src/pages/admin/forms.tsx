import { type ReactElement } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const Forms = () => {
  const utils = api.useUtils();
  const [formSchema, setFormSchema] = useState({});
  const [uiSchema, setUiSchema] = useState<UISchemaElement>({});
  const { data, error, isLoading } = api.form.getForms.useQuery({
    includeSchemas: true,
  });

  const { mutateAsync } = api.form.editForm.useMutation({
    onSuccess: async () => {
      await utils.form.getForms.invalidate();
    },
  });

  const onSubmit: SubmitHandler<CreateCollectionData> = async (data) => {
    await mutateAsync({
      ...data,
      roles: data.roles.map((role) => role.toUpperCase()),
    });
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
              <TableRow key={form.name}>
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
                    src={() => parseJSON<UISchemaElement>(form.uiSchema, {})}
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

Forms.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

Forms.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Forms;
