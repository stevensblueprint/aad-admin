import { useState, type ReactElement } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AdminLayout from "../../components/layouts/AdminLayout";
import { api } from "../../utils/api";

enum UserRole {
  MENTEE = "MENTEE",
  MENTOR = "MENTOR",
  ADMIN = "ADMIN",
}

const Directory = () => {
  const { data, isLoading } = api.user.getAll.useQuery();
  const [selectionModel, setSelectionModel] = useState<string[]>([]);

  const deleteMutation = api.user.deleteById.useMutation();

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

  const handleDelete = () => {
    if (selectionModel.length > 0) {
      Promise.all(
        selectionModel.map((id) => deleteMutation.mutateAsync({ id })),
      )
        .then(() => {
          setSelectionModel([]);
        })
        .catch((error) => {
          console.error("Error deleting items:", error);
        });
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mb-12 mt-6 text-6xl font-bold text-aero">Directory</h1>
      <button
        className="mb-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={handleDelete}
        disabled={selectionModel.length === 0 || deleteMutation.isLoading}
      >
        Delete Selected
      </button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel as string[]);
          }}
          rowSelectionModel={selectionModel}
          loading={isLoading || deleteMutation.isLoading}
        />
      </div>
    </main>
  );
};

Directory.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Directory;
