import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  DialogContentText,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, type ReactElement } from "react";
import { type SubmitHandler } from "react-hook-form";
import ConfirmDialog from "../../components/ConfirmDialog";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import CollectionForm, {
  type CreateCollectionData,
} from "../../components/admin/CollectionForm";
import EditCollectionDialog, {
  Collection,
} from "../../components/admin/EditCollectionDialog";
import ErrorPage from "../../components/error/error";
import AdminLayout from "../../components/layouts/AdminLayout";
import DefaultLoadingPage from "../../components/loading/loading";
import { api } from "../../utils/api";
import { sentenceCase } from "../../utils/roles";

const Collections = () => {
  const utils = api.useUtils();
  const { data, error, isLoading } = api.collection.getCollections.useQuery();
  const {
    mutate: createCollection,
    status: createStatus,
    reset: resetCreate,
  } = api.collection.createCollection.useMutation({
    onSuccess: async () => {
      await utils.collection.getCollections.invalidate();
    },
  });
  const {
    mutateAsync: deleteCollection,
    status: deleteStatus,
    error: deleteError,
    reset: resetDelete,
  } = api.collection.deleteCollection.useMutation({
    onSuccess: async () => {
      await utils.collection.getCollections.invalidate();
    },
    useErrorBoundary: false,
  });
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );
  const [deletingCollection, setDeletingCollection] =
    useState<Collection | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const onSubmit: SubmitHandler<CreateCollectionData> = (data) => {
    createCollection({
      ...data,
      roles: data.roles.map((role) => role.toUpperCase()),
    });
  };
  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const confirmDelete = async (yes: boolean) => {
    if (!yes) {
      setDeleteDialogOpen(false);
      return;
    }
    if (!deletingCollection) return;
    try {
      await deleteCollection({ id: deletingCollection.id });
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;
  return (
    <Stack className="mt-4" gap={4}>
      <Snackbar
        open={createStatus === "error" || createStatus === "success"}
        autoHideDuration={6000}
        onClose={resetCreate}
      >
        <Alert severity={createStatus === "error" ? "error" : "success"}>
          {createStatus === "error"
            ? "An error occurred while creating the collection."
            : "Collection created successfully."}
        </Alert>
      </Snackbar>
      <EditCollectionDialog
        collection={editingCollection}
        close={closeEditDialog}
        open={editDialogOpen}
      />
      <ConfirmDialog
        action={deleteStatus === "idle" ? "Delete" : undefined}
        open={deleteDialogOpen}
        title={`Delete collection ${deletingCollection?.name}`}
        confirm={() => confirmDelete}
      >
        {deleteStatus === "idle" ? (
          <Stack gap={2}>
            <DialogContentText>
              Are you sure you want to delete this collection? This action
              cannot be undone.
            </DialogContentText>
            <Alert severity="warning">
              All submissions for this collection will be deleted.
            </Alert>
          </Stack>
        ) : deleteStatus === "loading" ? (
          <Box className="flex justify-center">
            <CircularProgress />
          </Box>
        ) : deleteStatus === "error" ? (
          <Alert severity="error">{deleteError.message}</Alert>
        ) : (
          <Alert severity="success">Collection deleted successfully.</Alert>
        )}
      </ConfirmDialog>
      <Card>
        <CardContent>
          {createStatus === "loading" ? (
            <Box className="flex justify-center">
              <CircularProgress />
            </Box>
          ) : (
            <CollectionForm onSubmit={onSubmit} />
          )}
        </CardContent>
      </Card>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Collection Name</TableCell>
                <TableCell align="right">Form Schema</TableCell>
                <TableCell align="right">Roles</TableCell>
                <TableCell align="right">Open</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((collection) => (
                <TableRow key={collection.id}>
                  <TableCell>{collection.name}</TableCell>
                  <TableCell align="right">{collection.formName}</TableCell>
                  <TableCell align="right">
                    {collection.roles
                      .map(({ roleName }) => sentenceCase(roleName))
                      .join(", ")}
                  </TableCell>
                  <TableCell align="right">
                    {collection.isOpen ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    <CopyToClipboardButton
                      link={`${window.location.origin}/form/${collection.id}`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" gap={2}>
                      <Button
                        onClick={() => {
                          setEditingCollection(collection);
                          setEditDialogOpen(true);
                        }}
                        variant="contained"
                        color="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          resetDelete();
                          setDeletingCollection(collection);
                          setDeleteDialogOpen(true);
                        }}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Stack>
  );
};

Collections.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Collections;
