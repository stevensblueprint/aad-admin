import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { api } from "../../utils/api";
import { type SubmitHandler } from "react-hook-form";
import CollectionForm, {
  CreateCollectionData,
} from "../../components/admin/CollectionForm";

const Collections = () => {
  const { data, error, isLoading } = api.collection.getCollections.useQuery();
  // TODO: error handling decision
  const {
    mutateAsync,
    error: createError,
    isLoading: createLoading,
  } = api.collection.createCollection.useMutation();
  const onSubmit: SubmitHandler<CreateCollectionData> = async (data) => {
    debugger;
    await mutateAsync(data);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Container>
      <CollectionForm onSubmit={onSubmit} />
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
    </Container>
  );
};

export default Collections;
