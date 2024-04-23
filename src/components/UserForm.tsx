import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Modal, TextField } from "@mui/material";
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
      <button
        onClick={() => setAddModalOpen(true)}
        className="ml-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Add User
      </button>
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
        >
          <h2 id="add-user-modal-title" className="mb-2 text-lg font-bold">
            Add User
          </h2>
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Name"
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserForm;
