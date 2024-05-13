import { Alert, Card, CardContent, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { type JSONObject } from "superjson/dist/types";
import ErrorPage from "../../components/error/error";
import JsonForm from "../../components/forms/JsonForm";
import DefaultLoadingPage from "../../components/loading/loading";
import { api } from "../../utils/api";

/**
 * Form page that gets the collection by id and renders the form based
 * on the schemas and uiSchemas from the collection
 */
const Form = () => {
  useSession({ required: true });
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const router = useRouter();
  const { id } = useParams();
  const { data, error, status } =
    api.collection.getMyCollectionSubmission.useQuery(
      {
        collectionId: id as string,
      },
      { retry: false, refetchOnWindowFocus: false },
    );

  const {
    mutateAsync: submit,
    status: submitStatus,
    error: submitError,
  } = api.form.submitForm.useMutation();
  const { formSchema, uiSchema } = useMemo(() => {
    if (!data) return {};
    return {
      formSchema: JSON.parse(data.collection.form.formSchema),
      uiSchema: JSON.parse(data.collection.form.uiSchema),
    };
  }, [data]);

  const onSubmit = async (data: JSONObject) => {
    await submit({ collectionId: router.query.id as string, data });
    setSubmitted(true);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          void router.push("/");
        }
        return prev - 1;
      });
    }, 1000);
  };

  let body: JSX.Element = <></>;

  if (status === "loading" || submitStatus === "loading") {
    return <DefaultLoadingPage />;
  } else if (status === "error") {
    return <ErrorPage errorMessage={error.message} />;
  } else if (submitStatus === "error") {
    return <ErrorPage errorMessage={submitError.message} />;
  } else if (submitted) {
    body = (
      <Card className="mx-3 p-4 text-center text-black">
        <h1 className="text-3xl">Thank you!</h1>
        <p className="text-xl">
          Your submission has been recieved! Redirecting you home in {countdown}{" "}
          seconds...
        </p>
      </Card>
    );
  } else if (status === "success") {
    const alreadySubmitted = !!data.submission?.data;
    body = (
      <Container className="my-4 flex w-full flex-col gap-4 items-center">
        <Typography variant="h4" className="font-bold text-white">
          {data.collection.name}
        </Typography>
        <Card>
          <CardContent className="p-8">
            <Typography variant="body1">
              {data.collection.instructions}
            </Typography>
            {alreadySubmitted && (
              <Alert severity="info" className="mt-4">
                You have already submitted this form, but feel free to edit your
                responses and submit the form again. Your new submission will
                replace your old submission.
              </Alert>
            )}
          </CardContent>
        </Card>
        <JsonForm
          schema={formSchema}
          uischema={uiSchema}
          initialData={data.submission?.data ?? {}}
          onSubmit={onSubmit}
        />
      </Container>
    );
  }

  return (
    <Container className="flex min-h-screen min-w-full flex-col items-center bg-gradient-to-b from-midnight-sky to-aero p-8">
      {body}
    </Container>
  );
};
export default Form;
