import { type UISchemaElement } from "@jsonforms/core";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { type JSONObject } from "superjson/dist/types";
import { api, type RouterOutputs } from "../../utils/api";
import JsonForm from "../forms/JsonForm";

interface SubmissionDialogProps {
  open: boolean;
  close: () => void;
  submission: Submission | null;
  formName: string | null;
}

interface Form {
  formSchema: object;
  uiSchema: UISchemaElement;
}

export type Submission =
  RouterOutputs["collection"]["getCollectionsWithSubmissions"][number]["submissions"][number];

const SubmissionDialog = ({
  close,
  open,
  submission,
  formName,
}: SubmissionDialogProps) => {
  const [form, setForm] = useState<Form | null>(null);
  const utils = api.useUtils();
  useEffect(() => {
    void (async () => {
      if (!formName) {
        return;
      }
      setForm(null);
      const form = await utils.form.getForm.fetch({ formName });
      if (!form) {
        return;
      }
      setForm({
        ...form,
        formSchema: JSON.parse(form.formSchema) as object,
        uiSchema: JSON.parse(form.uiSchema) as UISchemaElement,
      });
    })();
  }, [formName]);
  return (
    <Dialog open={open} onClose={close}>
      {submission && (
        <DialogTitle>
          Viewing submission for{" "}
          {submission.submittedBy.profile.preferredName ??
            submission.submittedBy.name}
        </DialogTitle>
      )}
      <DialogContent>
        {form && submission ? (
          <JsonForm
            schema={form.formSchema}
            uischema={form.uiSchema}
            initialData={submission.data as JSONObject}
          />
        ) : (
          <div className="flex justify-center">
            <CircularProgress className="block" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default SubmissionDialog;
