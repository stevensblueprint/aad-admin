import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { api } from "../../utils/api";
import ConfirmDialog from "../ConfirmDialog";
import UserForm, { type CreateUserData } from "../admin/UserForm";

enum UserRole {
  MENTEE = "Mentee",
  MENTOR = "Mentor",
  ADMIN = "Admin",
}

interface DirectoryTableProps {
  adminMode?: boolean;
}
const DirectoryTable = ({ adminMode = false }: DirectoryTableProps) => {
  const utils = api.useUtils();
  const [deleteDialogConfirm, setDeleteDialogConfirm] = useState<
    null | ((yes: boolean) => void)
  >(null);
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.MENTEE);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [action, setAction] = useState<"delete" | null>(null);
  const { data, isLoading } = api.user.getByRole.useQuery({
    role: currentRole.toUpperCase(),
  });
  const createUserMutation = api.user.createUser.useMutation({
    onSuccess: () => {
      void utils.user.getByRole.invalidate();
    },
  });
  const deleteUsersMutation = api.user.deleteByIds.useMutation({
    onSuccess: () => {
      void utils.user.getByRole.invalidate();
    },
  });

  const onSubmit: SubmitHandler<CreateUserData> = async (data) => {
    await createUserMutation.mutateAsync({
      ...data,
      role: data.role.toUpperCase(),
    });
  };

  const onDelete = async () => {};

  const handleDeleteUsers = async () => {
    if (selectedUsers.length > 0) {
      try {
        await deleteUsersMutation.mutateAsync({ ids: selectedUsers });
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("No users selected for deletion.");
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: false,
      renderCell: ({ id, value }) => (
        <Link
          href={{ pathname: "/profiles/[id]", query: { id: id as string } }}
          onClick={(e) => e.stopPropagation()}
          className="visited:text-blue-500 text-blue-500"
        >
          {value}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
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
    ? data.map(({ id, name, email, roleName }) => ({
        id,
        name,
        email,
        role: roleName,
      }))
    : [];

  return (
    <div className="flex w-full flex-col items-center px-6">
      <h1 className="mt-6 text-6xl font-bold text-aero">Directory</h1>
      {adminMode && (
        <div className="mx-auto gap-2 flex justify-end">
          <UserForm onSubmit={onSubmit} />
          <Button
            variant="contained"
            color="error"
            onClick={() => void onDelete()}
            disabled={selectedUsers.length === 0}
          >
            Delete Selected
          </Button>
          <ConfirmDialog
            title={`Are you sure you would like to delete the ${selectedUsers.length} selected users?`}
            action="Delete"
            confirm={() => deleteDialogConfirm}
            open={!!deleteDialogConfirm}
          >
            This cannot be undone.
          </ConfirmDialog>
        </div>
      )}
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
      <div className="w-full h-[600px]">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={adminMode}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectedUsers(newSelectionModel as string[]);
          }}
          rowSelectionModel={selectedUsers}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
export default DirectoryTable;
