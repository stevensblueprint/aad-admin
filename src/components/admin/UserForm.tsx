import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

enum UserRole {
  EMPTY = "",
  MENTEE = "MENTEE",
  MENTOR = "MENTOR",
  ADMIN = "ADMIN",
}

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 character" }),
  email: z.string().email({ message: "Invalid email" }),
  role: z.nativeEnum(UserRole),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

interface UserFormProps {
  onSubmit: (data: CreateUserData) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: UserRole.EMPTY,
    },
  });

  const handleOnSubmit = (data: CreateUserData) => {
    onSubmit(data);
    setAddModalOpen(false);
    reset();
  };

  return (
    <>
      <Button
        onClick={() => setAddModalOpen(true)}
        variant="contained"
        color="success"
      >
        Add User
      </Button>
      <Modal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-user-modal-title"
        className="flex h-screen items-center justify-center"
      >
        <Box
          component="form"
          onSubmit={(...args) => void handleSubmit(handleOnSubmit)(...args)}
          className="m-4 flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-xl"
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
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Name"
                variant="standard"
                fullWidth
                margin="normal"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                margin="normal"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                select
                label="Role"
                variant="standard"
                fullWidth
                margin="normal"
                {...field}
                error={!!error}
                helperText={error?.message}
                SelectProps={{ native: true }}
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </TextField>
            )}
            name="role"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserForm;
