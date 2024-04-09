import { api } from "../../utils/api";
import JsonForm from "../../components/forms/JsonForm";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { type JSONObject } from "superjson/dist/types";
import DefaultLoadingPage from "../../components/loading/loading";
import ErrorPage from "../../components/error/error";

/**
 * Form page that gets the collection by id and renders the form based
 * on the schemas and uiSchemas from the collection
 */
const Form = () => {
  const router = useRouter();
  const { data, error, isLoading } = api.collection.getCollectionById.useQuery({
    id: router.query.id as string,
  });
  const { mutate: submit } = api.form.submitForm.useMutation();
  const { formSchema, uiSchema } = useMemo(() => {
    if (!data) return {};
    return {
      formSchema: JSON.parse(data.form.formSchema),
      uiSchema: JSON.parse(data.form.uiSchema),
    };
  }, [data]);
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;
  const onSubmit = (data: JSONObject) => {
    submit({ collectionId: router.query.id as string, data });
  };
  return (
    <>
      {/* Info panel about form customizable when it is created */}
      <JsonForm
        schema={formSchema}
        uischema={uiSchema}
        initialData={{}}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Form;
