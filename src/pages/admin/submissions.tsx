import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement, useMemo } from "react";
import DefaultLoadingPage from "~/components/loading/loading";
import AdminLayout from "../../components/layouts/AdminLayout";
import { api } from "../../utils/api";

const SubmissionPage = () => {
  const {
    data: collectionIds,
    error: collectionError,
    isLoading: collectionLoading,
  } = api.collection.getAllCollectionIds.useQuery();

  const {
    data: submissionsData,
    error: submissionError,
    isLoading: submissionLoading,
  } = api.collection.getCollectionWithSubmissionsById.useQuery({
    ids: collectionIds ? collectionIds.map((collection) => collection.id) : [],
  });

  const submissions = useMemo(() => {
    if (!submissionsData) return []; // Return an empty array if submissionsData is not available
    return submissionsData.flatMap((collection) => collection.submissions);
  }, [submissionsData]); // Dependency array containing submissionsData

  if (collectionLoading || submissionLoading) return <DefaultLoadingPage />;
  if (collectionError ?? submissionError)
    return <div>Error: {submissionError?.message}</div>;

  console.log(collectionIds);
  console.log(submissionsData);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Collection</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.submittedBy?.name}</TableCell>
                <TableCell>{submission.createdAt.toLocaleString()}</TableCell>
                <TableCell>{submission.updatedAt.toLocaleString()}</TableCell>
                <TableCell>{submission.collection?.name}</TableCell>
                <TableCell>{JSON.stringify(submission.data)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

SubmissionPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default SubmissionPage;
