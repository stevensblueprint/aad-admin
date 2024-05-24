/**
 * This component will be used by Admins to build new forms
 *
 * [Core]
 * Each Form must have a Form Schema and UI Schema. Optionally, they can have filler data itself
 *
 * When an admin presses "Create Form" Button, the basics of Form Schema and UI Schema should be generated and populated into
 * their respective JsonEditor component. A type interface should be generated for each Schema (use a library).
 * TODO: Should admins even be able to see the UISchema? It remains static most of the time, so I think it might be best to just let them edit formSchema
 *
 * Each JsonEditor should maintain its own state, which is submitted when the user presses submit. On Submit,
 * the schema that the user generated should be validated against JSON Forms proper schema. If not successful
 * the application should generate a message on what the user did wrong and keep the submitted JSON in the editors
 * instead of wiping it
 *
 * [Reach]
 * Admins should have a menu of preselected components that they can click and the respective JSON will be generated for them
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { JsonEditor } from "json-edit-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const createFormSchema = z.object({
  id: z.string().min(1, { message: "Must provide a form name" }),
  formSchema: z
    .string()
    .min(1, { message: "Must provide a valid Form Schema" }),
  uiSchema: z.string().min(1, { message: "Must provide a valid UI Schema" }),
});

export type CreateFormData = z.infer<typeof createFormSchema>;

interface FormBuilderProps {
  onSubmit: (data: CreateFormData) => void;
}

const FormBuilder = ({ onSubmit }: FormBuilderProps) => {
  const [id, setid] = useState<string>();
  const [formSchema, setFormSchema] = useState<object>({
    type: "Object",
    properties: {},
    required: [],
  });
  const [uiSchema, setUiSchema] = useState<object>({
    type: "verticalLayout",
    elements: [],
  });

  const { handleSubmit, control, reset } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      id: "",
      formSchema: "{}",
      uiSchema: "{}",
    },
  });

  const handleOnSubmit = (data: CreateFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={(...args) => void handleSubmit(handleOnSubmit)(...args)}
      className="flex gap-2"
    >
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Form Name"
            {...field}
            error={!!error}
            helperText={error?.message}
          />
        )}
        name="id"
      />
      <JsonEditor data={formSchema} />
      <JsonEditor data={uiSchema} restrictEdit={true} />
      <div>PUT COMPONENT MENU HERE</div>
      <Button type="submit" variant="outlined">
        Create
      </Button>
    </Box>
  );
};

export default FormBuilder;
