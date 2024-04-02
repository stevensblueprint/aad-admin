import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DefaultLoadingPage from "../loading/loading";

export const createCollectionSchema = z.object({
  formName: z.string(),
  // TODO: this should change to visibility, and be an enum
  // perhaps not visibility, but audience as all forms will require auth
  isPublic: z.boolean(),
  isOpen: z.boolean(),
  name: z.string(),
});

export type CreateCollectionData = z.infer<typeof createCollectionSchema>;

interface CollectionFormProps {
  onSubmit: (data: CreateCollectionData) => void;
}

const CollectionForm = ({ onSubmit }: CollectionFormProps) => {
  const { data: forms, isLoading } = api.form.getForms.useQuery({});
  const { handleSubmit, control } = useForm<CreateCollectionData>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      formName: "",
      isPublic: false,
      isOpen: false,
      name: "",
    },
  });
  if (isLoading) {
    return <DefaultLoadingPage />;
  }
  return (
    <Box
      component="form"
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
    >
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Collection Name"
            {...field}
            error={!!error}
            helperText={error?.message}
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        render={({ field, fieldState: {} }) => (
          <Select {...field} fullWidth>
            {forms?.map(({ name }) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
        name="formName"
      />
      <Controller
        control={control}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox />} label="Public" {...field} />
        )}
        name="isPublic"
      />
      <Controller
        control={control}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox />} label="Open" {...field} />
        )}
        name="isOpen"
      />
      <Button type="submit">Create</Button>
    </Box>
  );
};

export default CollectionForm;
