import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState, type ReactElement } from "react";
import DefaultLoadingPage from "~/components/loading/loading";
import SubmissionDialog, {
  type Submission,
} from "../../components/admin/SubmissionDialog";
import Error from "../../components/error/error";
import AdminLayout from "../../components/layouts/AdminLayout";
import { api } from "../../utils/api";

const SubmissionPage = () => {
  const { data, status, error } =
    api.collection.getCollectionsWithSubmissions.useQuery();
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [selectedFormName, setSelectedFormName] = useState<string | null>(null);

  const closeSubmissionDialog = () => {
    setSelectedSubmission(null);
  };

  const { collectionIdToSubmissions, collectionSelectItems } = useMemo(() => {
    if (status !== "success")
      return {
        collectionSelectItems: [],
        collectionIdToSubmissions: {},
      };
    const collectionIdToSubmissions = data.reduce<
      Record<string, { formName: string; submissions: Submission[] }>
    >((acc, collection) => {
      const { id, submissions, formName } = collection;
      acc[id] = { formName, submissions };
      return acc;
    }, {});
    const formNames = [...new Set(data.map(({ formName }) => formName))];
    const collectionSelectItems = formNames.flatMap((formName) => [
      <ListSubheader key={formName}>{formName}</ListSubheader>,
      ...data
        .filter(({ formName: name }) => name === formName)
        .map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        )),
    ]);
    return { collectionSelectItems, collectionIdToSubmissions };
  }, [data, status]);
  if (status === "loading") {
    return <DefaultLoadingPage />;
  }
  if (status === "error") {
    return <Error errorMessage={error.message} />;
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <SubmissionDialog
        open={!!selectedSubmission}
        close={closeSubmissionDialog}
        submission={selectedSubmission}
        formName={selectedFormName}
      />
      <Card>
        <CardContent className="flex flex-row">
          <Typography variant="body1">
            Select which collection to view the submissions for:{" "}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Collection</InputLabel>
            <Select
              onChange={(e) => {
                const collectionId = e.target.value;
                if (collectionId === "") {
                  setSelectedCollectionId(null);
                  return;
                }
                setSelectedCollectionId(collectionId);
                setSelectedFormName(
                  collectionIdToSubmissions[collectionId]?.formName ?? null,
                );
              }}
              label="Collection"
              value={selectedCollectionId ?? ""}
            >
              <MenuItem value="">Select a collection</MenuItem>
              {collectionSelectItems}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card>
        {selectedCollectionId && (
          <TableContainer className="h-[600px]">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Preferred Name</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collectionIdToSubmissions[
                  selectedCollectionId
                ]?.submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      {submission.submittedBy.profile?.preferredName ??
                        submission.submittedBy.name}
                    </TableCell>
                    <TableCell>
                      {submission.createdAt.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {submission.updatedAt.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedSubmission(submission);
                        }}
                        variant="contained"
                      >
                        View Data
                      </Button>
                    </TableCell>
                  </TableRow>
                )) ?? []}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
};

SubmissionPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default SubmissionPage;
