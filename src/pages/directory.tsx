import { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { api } from "../utils/api";
import DefaultLoadingPage from "~/components/loading/loading";
import ErrorPage from "../components/error/error";
import UserForm, { type CreateUserData } from "~/components/UserForm";
import { type SubmitHandler } from "react-hook-form";

enum UserRole {
  EMPTY = "",
  MENTEE = "MENTEE",
  MENTOR = "MENTOR",
  ADMIN = "ADMIN",
}

const Directory = () => {
  const utils = api.useUtils();
  const { data, error, isLoading } = api.user.getAll.useQuery();
  const [selectionModel, setSelectionModel] = useState<string[]>([]);
  const { mutateAsync } = api.user.createUser.useMutation({
    onSuccess: async () => {
      await utils.collection.getCollections.invalidate();
    },
  });

  const onSubmit: SubmitHandler<CreateUserData> = async (data) => {
    await mutateAsync({
      ...data,
      role: data.role.toUpperCase(),
    });
  };
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      editable: false,
      type: "singleSelect",
      valueOptions: Object.values(UserRole),
      filterable: true,
    },
  ];

  const rows = data
    ? data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roleName,
      }))
    : [];

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mb-12 mt-6 text-6xl font-bold text-aero">Directory</h1>
      <div className="w-3/4">
        <div className="mb-2 flex justify-end">
          <UserForm onSubmit={onSubmit} />
          <button className="ml-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
            Delete Selected
          </button>
        </div>
      </div>
      <div className="w-3/4">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel as string[]);
          }}
          rowSelectionModel={selectionModel}
          loading={isLoading}
        />
      </div>
    </main>
  );
};

export default Directory;
