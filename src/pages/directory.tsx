import { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { api } from "../utils/api";
import DefaultLoadingPage from "~/components/loading/loading";
import ErrorPage from "../components/error/error";
import UserForm, { type CreateUserData } from "~/components/UserForm";
import { type SubmitHandler } from "react-hook-form";

enum UserRole {
  EMPTY = "",
  MENTEE = "Mentee",
  MENTOR = "Mentor",
  ADMIN = "Admin",
}

const Directory = () => {
  const utils = api.useUtils();
  const { data, error, isLoading } = api.user.getAll.useQuery();
  const [selectionModel, setSelectionModel] = useState<string[]>([]);
  const createUserMutation = api.user.createUser.useMutation({
    onSuccess: () => {
      void utils.user.getAll.invalidate();
    },
  });
  const deleteUsersMutation = api.user.deleteByIds.useMutation({
    onSuccess: () => {
      void utils.user.getAll.invalidate();
    },
  });

  const onSubmit: SubmitHandler<CreateUserData> = async (data) => {
    await createUserMutation.mutateAsync({
      ...data,
      role: data.role.toUpperCase(),
    });
  };

  const handleDeleteUsers = () => {
    if (selectionModel.length > 0) {
      deleteUsersMutation
        .mutateAsync({ ids: selectionModel })
        .then(() => {
          setSelectionModel([]);
        })
        .catch((error) => {
          console.error("Failed to delete users:", error);
        });
    } else {
      alert("No users selected for deletion.");
    }
  };

  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 400,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      editable: true,
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
          <button
            className="ml-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleDeleteUsers}
          >
            Delete Selected
          </button>
        </div>
      </div>
      <div className="w-3/4" style={{ height: "400px" }}>
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
