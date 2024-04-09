import * as React from "react";
import { api } from "../../utils/api";
import DefaultLoadingPage from "~/components/loading/loading";
import {
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";

const SubmissionPage = () => {
  const {
    data: collectionIds,
    error: collectionError,
    isLoading: collectionLoading,
  } = api.collection.getAllCollectionId.useQuery();

  const {
    data: submissionsData,
    error: submissionError,
    isLoading: submissionLoading,
  } = api.collection.getCollectionWithSubmissionsById.useQuery({
    ids: collectionIds ? collectionIds.map((collection) => collection.id) : [],
  });

  if (collectionLoading || submissionLoading) return <DefaultLoadingPage />;
  if (collectionError ?? submissionError)
    return <div>Error: {submissionError?.message}</div>;

  console.log(collectionIds);
  console.log(submissionsData);

  // Flatten the submissionsData array
  const submissions = submissionsData.flatMap(
    (collection) => collection.Submission,
  );

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
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.submittedBy?.name}</TableCell>
                <TableCell>{(submission.createdAt).toLocaleString()}</TableCell>
                <TableCell>{(submission.updatedAt).toLocaleString()}</TableCell>
                <TableCell>{submission.collection?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SubmissionPage;
