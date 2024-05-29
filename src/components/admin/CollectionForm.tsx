import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../utils/api";
import MultipleSelectChip from "../settings/MulitpleSelectChip";

export const createCollectionSchema = z.object({
  formName: z.string().min(1, { message: "Must select a form schema" }),
  roles: z
    .array(z.string())
    .min(1, { message: "Must select at least one role" }),
  isOpen: z.boolean(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  instructions: z
    .string()
    .min(1, { message: "Instructions must be at least 1 character" }),
});

const roles = ["Mentor", "Mentee"];

export type CreateCollectionData = z.infer<typeof createCollectionSchema>;

interface CollectionFormProps {
  onSubmit: (data: CreateCollectionData) => void;
  initialData?: CreateCollectionData;
}

const CollectionForm = ({ onSubmit, initialData }: CollectionFormProps) => {
  const { data: forms, isLoading: formsLoading } = api.form.getForms.useQuery(
    {},
  );
  const { handleSubmit, control, reset } = useForm<CreateCollectionData>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: initialData ?? {
      formName: "",
      roles: [],
      isOpen: false,
      name: "",
      instructions: "",
    },
  });
  const handleOnSubmit = (data: CreateCollectionData) => {
    onSubmit(data);
    reset();
  };
  if (formsLoading) {
    return (
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      component="form"
      onSubmit={(...args) => void handleSubmit(handleOnSubmit)(...args)}
      className="flex flex-col gap-2 "
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
        render={({ field, fieldState: { error } }) => (
          <TextField
            multiline
            minRows={4}
            label="Form Instructions"
            {...field}
            error={!!error}
            helperText={error?.message}
          />
        )}
        name="instructions"
      />
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <InputLabel>Form Schema</InputLabel>
            <Select {...field} fullWidth label="Form Schema">
              {forms?.map(({ name }) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        )}
        name="formName"
      />
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MultipleSelectChip
            defaultValue={initialData?.roles ?? []}
            options={roles}
            editMode
            error={!!error}
            helperText={error?.message ?? ""}
            label="Who should see this form?"
            updateValue={field.onChange}
          />
        )}
        name="roles"
      />
      <Controller
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox />}
            label="Enable collection on creation"
            checked={field.value}
            {...field}
          />
        )}
        name="isOpen"
      />
      <Button type="submit" variant="outlined">
        {initialData ? "Edit" : "Create"}
      </Button>
    </Box>
  );
};

export default CollectionForm;
