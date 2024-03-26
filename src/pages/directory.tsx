import { api } from "../utils/api";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, type ReactElement } from "react";
import AdminLayout from "../components/layouts/AdminLayout";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';


enum UserRole {
  MENTEE = "Mentee",
  MENTOR = "Mentor",
  ADMIN = "Admin",
}

const Directory = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.MENTEE);

  const { data, isLoading } = api.user.getByRole.useQuery({
    role: currentRole.toUpperCase(),
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 110,
      editable: false,
      type: 'singleSelect',
      valueOptions: Object.values(UserRole),
    },
  ];
  
  const rows = data ? data.map(user => ({
    id: user.id,
    name: user.user.name,
    email: user.user.email,
    role: user.user.roleName,
  })) : [];

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mt-6 text-6xl font-bold text-aero">Directory</h1>
      <ToggleButtonGroup
        className="mb-4 mt-10"
        size="large"
        color="primary"
        exclusive
        value={currentRole}
        onChange={(event, newRole: string | null) => {
          if (newRole !== null)
            setCurrentRole(newRole as UserRole);
        }}
      >
        {Object.values(UserRole).map((role) => (
          <ToggleButton
            key={role}
            value={role.toLowerCase()}
            disabled={isLoading}
          >
            {role}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div style={{ height: 400, width: '100%' }}>
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
