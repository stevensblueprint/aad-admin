import { type ReactElement } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

const Forms = () => {
  const utils = api.useUtils();
  const [formName, setFormName] = useState<string>();
  const [formSchema, setFormSchema] = useState<object>();
  const [uiSchema, setUiSchema] = useState<UISchemaElement>({
    type: "VerticalLayout",
  });
  const { data, error, isLoading } = api.form.getForms.useQuery({
    includeSchemas: true,
  });

  const updateForm = api.form.updateForm.useMutation();

  /** TODO: Form Creation Interface */
  // const { mutateAsync } = api.form.createForm.useMutation({
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
    formName: string,
    clickedFormSchema: object,
    clickedUiSchema: UISchemaElement,
  ) => {
    setFormName(formName);
    setFormSchema(clickedFormSchema);
    setUiSchema(clickedUiSchema);
  };

  // TODO: Changes should be cached, and admin should hit a submit button to confirm
  // Otherwise, multiple DB updates will start as opposed to one large one
  // FIXME: updates are being written to database, but changes are not reflecting in the User Interface.
  const handleEdit = async (
    formName: string,
    updatedFormSchema: string,
    updatedUiSchema: string,
  ) => {
    await updateForm.mutateAsync({
      id: formName,
      newFormSchema: updatedFormSchema,
      newUiSchema: updatedUiSchema,
    });
  };

  // Extract the JSON and check the proper type from database row
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
                    form.name,
                    parseJSON<object>(form.formSchema, {}),
                    parseJSON<UISchemaElement>(form.uiSchema, {
                      type: "VerticalLayout",
                    }),
                  )
                }
              >
                <TableCell>{form.name}</TableCell>
                <TableCell>
                  <JsonEditor
                    data={() => parseJSON<object>(form.formSchema, {})}
                    onUpdate={async (data) => {
                      await handleEdit(
                        formName,
                        JSON.stringify(data.newData),
                        JSON.stringify(uiSchema),
                      );
                    }}
                  />
                </TableCell>
                <TableCell>
                  <JsonEditor
                    data={() =>
                      parseJSON<UISchemaElement>(form.uiSchema, {
                        type: "VerticalLayout",
                      })
                    }
                    onUpdate={async (data) => {
                      await handleEdit(
                        formName,
                        JSON.stringify(form.formSchema),
                        JSON.stringify(data.newData),
                      );
                    }}
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

export default Forms;
