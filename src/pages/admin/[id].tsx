import * as React from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
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

const Submissions = () => {
  const router = useRouter();

  // Fetch collection with submissions based on ID
  const {
    data: submissionsData,
    error,
    isLoading,
  } = api.collection.getCollectionWithSubmissionsById.useQuery({
    id: router.query.id as string,
  });

  if (isLoading) return <DefaultLoadingPage />;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!submissionsData) {
    return <div>No data found</div>;
  }

  // Extract submissions data
  const submissions = submissionsData.Submission;

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
                <TableCell>
                  {new Date(submission.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(submission.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>{submission.collection.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Submissions;
