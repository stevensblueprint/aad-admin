import { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { api } from "../utils/api";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import DefaultLoadingPage from "~/components/loading/loading";
import ErrorPage from "../components/error/error";

enum UserRole {
  EMPTY = "",
  MENTEE = "MENTEE",
  MENTOR = "MENTOR",
  ADMIN = "ADMIN",
}

const Directory = () => {
  const { data, error, isLoading } = api.user.getAll.useQuery();
  const [selectionModel, setSelectionModel] = useState<string[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "", role: "" });
  const { mutate: createUser } = api.user.createUser.useMutation();
  const { mutate: deleteUser } = api.user.deleteByIds.useMutation();

  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  const handleSubmit = () => {
    createUser(
      {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      {
        onSuccess: () => {
          setAddModalOpen(false);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteUser(
      { ids: selectionModel },
      {
        onSuccess: () => {
          setSelectionModel([]);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

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
          <button
            className="ml-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={() => setAddModalOpen(true)}
          >
            Add New User
          </button>
          <button
            className="ml-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Selected
          </button>
        </div>
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
          <Button variant="contained" color="primary" onSubmit={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
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
