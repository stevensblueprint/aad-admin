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
  type CreateCollectionData,
} from "../../components/admin/CollectionForm";
import DefaultLoadingPage from "../../components/loading/loading";
import ErrorPage from "../../components/error/error";
import { sentenceCase } from "../../utils/roles";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";

const Collections = () => {
  const utils = api.useUtils();
  const { data, error, isLoading } = api.collection.getCollections.useQuery();
  const { mutateAsync } = api.collection.createCollection.useMutation({
    onSuccess: async () => {
      await utils.collection.getCollections.invalidate();
    },
  });
  const onSubmit: SubmitHandler<CreateCollectionData> = async (data) => {
    await mutateAsync({
      ...data,
      roles: data.roles.map((role) => role.toUpperCase()),
    });
  };
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;
  return (
    <Container className="mt-4">
      <CollectionForm onSubmit={onSubmit} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Collection Name</TableCell>
              <TableCell>Form Schema</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell>{collection.name}</TableCell>
                <TableCell>{collection.formName}</TableCell>
                <TableCell>
                  {collection.roles
                    .map(({ roleName }) => sentenceCase(roleName))
                    .join(", ")}
                </TableCell>
                <TableCell>{collection.isOpen ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <CopyToClipboardButton
                    link={`${window.location.origin}/form/${collection.id}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Collections;
