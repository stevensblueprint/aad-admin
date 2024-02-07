import { api } from "../../utils/api";
import JsonForm from "../../components/forms/JsonForm";
import { useMemo } from "react";
import { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();
  const { data, error, isLoading } = api.collection.getCollectionById.useQuery({
    id: router.query.id as string,
  });
  const { formSchema, uiSchema } = useMemo(() => {
    if (!data) return {};
    return {
      formSchema: JSON.parse(data.form.formSchema),
      uiSchema: JSON.parse(data.form.uiSchema),
    };
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return <JsonForm schema={formSchema} uischema={uiSchema} initialData={{}} />;
};

export default Form;
