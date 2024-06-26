import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Autocomplete,
  Button,
  FormControl,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
import MultipleSelectChip from "./MulitpleSelectChip";
import industryOptions from "./industries.json";
import universities from "./us_universities.json";

type EditProfileProps = {
  preferredName: string;
  email: string;
  bio: string;
  dateOfBirth: string;
  university: string;
  industries: string[];
};

// Define the Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  emailAddress: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of Birth is required"),
  biography: z.string().min(1, "Bio is required"),
  selectedUniversity: z.string().min(1, "College/University is required"),
  topIndustries: z
    .array(z.string())
    .min(1, "At least one industry must be selected"),
});

const EditProfile = ({
  preferredName,
  email,
  bio,
  dateOfBirth,
  university,
  industries,
}: EditProfileProps) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(preferredName);
  const [emailAddress, setEmailAddress] = useState(email);
  const [dob, setDOB] = useState(dateOfBirth);
  const [biography, setBiography] = useState(bio);
  const [selectedUniversity, setSelectedUniversity] = useState(university);
  const [topIndustries, setTopIndustries] = useState<string[]>(industries); //Set to empty array always but will need to figure out how to set initial value

  const [formErrors, setFormErrors] = useState<z.inferFlattenedErrors<
    typeof formSchema
  > | null>(null);

  // needed to ensure autocomplete doesn't lag as bad
  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });

  const mutation = api.user.updateProfile.useMutation();

  const handleSubmit = () => {
    const result = formSchema.safeParse({
      name,
      emailAddress,
      dob,
      biography,
      selectedUniversity,
      topIndustries,
    });

    if (!result.success) {
      // Handle the validation errors, e.g., show error messages to the user
      console.log(result.error.flatten());
      setFormErrors(result.error.flatten());
      return;
    }

    // If validation is successful, proceed with form submission logic
    console.log("Form data is valid", result.data);
    setEditMode(false);
    setFormErrors(null);
    // Add your form submission logic here (e.g., API call)
    mutation.mutate(result.data);
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center">
        <form className="flex flex-col">
          <div className="mb-4 flex w-full flex-row justify-between items-center">
            <h3 className="my-1 justify-between text-2xl font-bold">
              Profile Information
            </h3>
            {editMode ? (
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => handleSubmit()}
                sx={{ width: 100 }}
                endIcon={<SaveIcon />}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => setEditMode(true)}
                sx={{ width: 100 }}
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
            )}
          </div>
          <FormControl>
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              required
              sx={{ mb: 4 }}
              error={formErrors?.fieldErrors.name !== undefined}
              helperText={
                formErrors?.fieldErrors.name?.[0]
                  ? formErrors?.fieldErrors.name?.[0]
                  : ""
              }
            />
            <TextField
              type="email"
              variant="outlined"
              color="primary"
              label="Email"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              required
              sx={{ mb: 4 }}
              error={formErrors?.fieldErrors.emailAddress !== undefined}
              helperText={
                formErrors?.fieldErrors.emailAddress?.[0]
                  ? formErrors?.fieldErrors.emailAddress?.[0]
                  : ""
              }
            />
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Bio"
              multiline
              minRows={4}
              onChange={(e) => setBiography(e.target.value)}
              value={biography}
              required
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              sx={{ mb: 4 }}
              error={formErrors?.fieldErrors.biography !== undefined}
              helperText={
                formErrors?.fieldErrors.biography?.[0]
                  ? formErrors?.fieldErrors.biography?.[0]
                  : ""
              }
            />
            <TextField
              type="date"
              variant="outlined"
              color="primary"
              label="Date of Birth"
              onChange={(e) => setDOB(e.target.value)}
              value={dob}
              fullWidth
              InputProps={{
                readOnly: !editMode,
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 4 }}
              error={formErrors?.fieldErrors.dob !== undefined}
              helperText={
                formErrors?.fieldErrors.dob?.[0]
                  ? formErrors?.fieldErrors.dob?.[0]
                  : ""
              }
            />
            <Autocomplete
              disablePortal
              disableClearable={true}
              options={universities}
              filterOptions={filterOptions}
              value={{ label: selectedUniversity }}
              defaultValue={{ label: selectedUniversity }}
              isOptionEqualToValue={(option, value) => {
                return (
                  (option as { label: string }).label ===
                  (value as { label: string }).label
                );
              }}
              onChange={(e, value) =>
                setSelectedUniversity(
                  value != null ? (value as { label: string }).label : "",
                )
              }
              sx={{ mb: 4 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="College/University"
                  error={
                    formErrors?.fieldErrors.selectedUniversity !== undefined
                  }
                  helperText={
                    formErrors?.fieldErrors.selectedUniversity?.[0]
                      ? formErrors?.fieldErrors.selectedUniversity?.[0]
                      : "Search for your school"
                  }
                />
              )}
              readOnly={!editMode}
            />

            <MultipleSelectChip
              label="Industries"
              options={industryOptions}
              editMode={editMode}
              defaultValue={topIndustries}
              updateValue={setTopIndustries}
              error={formErrors?.fieldErrors.topIndustries !== undefined}
              helperText={
                formErrors?.fieldErrors.topIndustries?.[0]
                  ? formErrors?.fieldErrors.topIndustries?.[0]
                  : "Select your top 3"
              }
            />
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
