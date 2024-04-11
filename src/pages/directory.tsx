import { useState, type ReactElement } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AdminLayout from "../components/layouts/AdminLayout";
import { api } from "../utils/api";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

enum UserRole {
  EMPTY = "",
  MENTEE = "MENTEE",
  MENTOR = "MENTOR",
  ADMIN = "ADMIN",
}

const Directory = () => {
  const { data, isLoading } = api.user.getAll.useQuery();
  const [selectionModel, setSelectionModel] = useState<string[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "", role: "" });

  const deleteMutation = api.user.deleteById.useMutation();
  const addMutation = api.user.creatUser.useMutation();

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

  const handleAddUser = () => {
    addMutation
      .mutateAsync(userData)
      .then(() => {
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mb-12 mt-6 text-6xl font-bold text-aero">Directory</h1>
      <div>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          onClick={() => setAddModalOpen(true)}
        >
          Add New User
        </button>
        <button
          className="mb-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={handleDelete}
          disabled={selectionModel.length === 0 || deleteMutation.isLoading}
        >
          Delete Selected
        </button>
      </div>
      <Modal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-user-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-user-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            margin="normal"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            margin="normal"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextField
            select
            label="Role"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            SelectProps={{ native: true }}
            variant="standard"
            fullWidth
            margin="normal"
          >
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </TextField>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
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
