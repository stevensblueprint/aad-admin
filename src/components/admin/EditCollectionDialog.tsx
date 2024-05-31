import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { RouterOutputs, api } from "../../utils/api";
import { sentenceCase } from "../../utils/roles";
import CollectionForm, { CreateCollectionData } from "./CollectionForm";

interface EditCollectionDialogProps {
  open: boolean;
  close: () => void;
  collection: Collection | null;
}

export type Collection = RouterOutputs["collection"]["getCollections"][number];

const EditCollectionDialog = ({
  open,
  close,
  collection,
}: EditCollectionDialogProps) => {
  const utils = api.useUtils();
  const { mutate, status, error, reset } =
    api.collection.editCollection.useMutation({
      onSuccess: async () => {
        await utils.collection.getCollections.invalidate();
      },
    });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (status === "success") {
      timeout = setTimeout(() => close(), 4000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const initialData: CreateCollectionData | null = useMemo(
    () =>
      collection && {
        name: collection.name,
        roles: collection.roles.map(({ roleName }) => sentenceCase(roleName)),
        isOpen: collection.isOpen,
        instructions: collection.instructions,
        formName: collection.formName,
      },
    [collection],
  );

  if (initialData) {
    debugger;
  }

  const submit = (data: CreateCollectionData) => {
    collection &&
      mutate({
        ...data,
        id: collection.id,
        roles: data.roles.map((role) => role.toUpperCase()),
      });
  };

  return (
    <Dialog open={open} onClose={close} maxWidth="lg" fullWidth>
      <DialogTitle>Editing collection {collection?.name ?? ""}</DialogTitle>
      <DialogContent className="p-4">
        {status === "idle" && initialData ? (
          <CollectionForm initialData={initialData} onSubmit={submit} />
        ) : status === "loading" || !initialData ? (
          <Box className="flex justify-center">
            <CircularProgress />
          </Box>
        ) : status === "error" ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <Alert severity="success">Collection edited successfully!</Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectionDialog;
