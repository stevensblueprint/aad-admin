import { type ReactElement } from "react";
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
      <h1 className="mt-6 text-6xl font-bold text-aero mb-12">Directory</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          loading={isLoading}
        />
      </div>
    </main>
  );
};

Directory.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Directory;
