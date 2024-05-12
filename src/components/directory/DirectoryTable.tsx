import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { api } from "../../utils/api";

enum UserRole {
  MENTEE = "Mentee",
  MENTOR = "Mentor",
  ADMIN = "Admin",
}

interface DirectoryTableProps {
  adminMode?: boolean;
}
const DirectoryTable = ({ adminMode = false }: DirectoryTableProps) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.MENTEE);

  const { data, isLoading } = api.user.getByRole.useQuery({
    role: currentRole.toUpperCase(),
  });

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
    },
  ];

  const rows = data
    ? data.map((user) => ({
        id: user.id,
        name: user.user.name,
        email: user.user.email,
        role: user.user.roleName,
      }))
    : [];

  return (
    <div className="flex w-full flex-col items-center px-6">
      <h1 className="mt-6 text-6xl font-bold text-aero">Directory</h1>
      <ToggleButtonGroup
        className="mb-4 mt-10"
        size="large"
        color="primary"
        exclusive
        value={currentRole}
        onChange={(_, newRole: string | null) => {
          if (newRole !== null) setCurrentRole(newRole as UserRole);
        }}
      >
        {Object.values(UserRole).map((role) => (
          <ToggleButton key={role} value={role} disabled={isLoading}>
            {role}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className="w-full h-72">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={adminMode}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
export default DirectoryTable;
