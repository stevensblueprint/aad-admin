// TODO: Abstract Editing window into separate component
// Skeleton code for saving local state
import { useState } from "react";
import { api } from "~/utils/api";
import JsonView from "react18-json-view";

const FormEditor = () => {
  const updateForm = api.form.updateForm.useMutation();
};
