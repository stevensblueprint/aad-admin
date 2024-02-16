import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { api } from "../../utils/api";

const Collections = () => {
  const { data, error, isLoading } = api.collection.getCollections.useQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Collection Name</TableCell>
            <TableCell>Form Name</TableCell>
            <TableCell>Public</TableCell>
            <TableCell>Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((collection) => (
            <TableRow key={collection.id}>
              <TableCell>{collection.name}</TableCell>
              <TableCell>{collection.formName}</TableCell>
              <TableCell>{collection.isPublic ? "Yes" : "No"}</TableCell>
              <TableCell>{collection.isOpen ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Collections;