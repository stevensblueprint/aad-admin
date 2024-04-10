import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { z } from "zod";
import PreferenceDragAndDrop from "./PreferenceDragAndDrop";

export type Preference = {
  name: string;
  id: number;
  firstLetter: string;
};

// Define the Zod schema for form validation
const formSchema = z.object({
  preferences: z
    .array(
      z.object({
        name: z.string(),
        id: z.number(),
        firstLetter: z.string(),
      }),
    )
    .min(5, "Minimum of 5 must be selected")
    .max(5, "Maximum of 5 must be selected"), // Enforce maximum limit
});

const MatchingFormSteps = ({
  menteeOrMentorText,
  preferenceOptions,
  preferences,
  setPreferences,
  setSubmitted,
}: {
  menteeOrMentorText: string;
  preferenceOptions: Preference[];
  preferences: Preference[];
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState<z.inferFlattenedErrors<
    typeof formSchema
  > | null>(null);

  const handleFirstStepSubmit = () => {
    const result = formSchema.safeParse({
      preferences: preferences,
    });

    if (!result.success) {
      // Handle the validation errors, e.g., show error messages to the user
      setFormErrors(result.error.flatten());
      return false;
    }

    // If validation is successful, proceed with form submission logic
    console.log("Form data is valid", result.data);
    setFormErrors(null);
    return true;
  };

  const handleSubmit = () => {
    setFormErrors(null);

    // TODO:
    // Add your form submission logic here (e.g., API call)
    // mutation.mutate(result.data);
    console.log("Final preferences order:", preferences);
    setSubmitted(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>Select your top 5 {menteeOrMentorText}</StepLabel>
        <StepContent>
          <Typography>
            Select your top 5 {menteeOrMentorText} from the provided list. You
            can search for {menteeOrMentorText} by name.
          </Typography>
          <FormControl sx={{ width: 1, marginTop: 2, marginBottom: 2 }}>
            <Autocomplete
              multiple
              id="top-5-selected"
              options={preferenceOptions.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter),
              )}
              value={preferences}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={({ name }) => name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              onChange={(e, value) => {
                setPreferences(value);
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    menteeOrMentorText.charAt(0).toUpperCase() +
                    menteeOrMentorText.slice(1)
                  }
                  placeholder={
                    menteeOrMentorText.charAt(0).toUpperCase() +
                    menteeOrMentorText.slice(1)
                  }
                  error={formErrors?.fieldErrors.preferences !== undefined}
                  helperText={
                    formErrors?.fieldErrors.preferences?.[0]
                      ? formErrors?.fieldErrors.preferences?.[0]
                      : "Select 5"
                  }
                />
              )}
            />
          </FormControl>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  if (handleFirstStepSubmit()) {
                    handleNext();
                  }
                }}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
              <Button
                disabled={true}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Order your top 5 {menteeOrMentorText}</StepLabel>
        <StepContent>
          <Typography>
            Drag and drop your selected top 5 in order of preference. The first
            person will be your top choice, the second person will be your
            second choice, and so on.
          </Typography>
          <PreferenceDragAndDrop
            preferences={preferences}
            setPreferences={setPreferences}
          />
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  handleNext();
                  handleSubmit();
                }}
                sx={{ mt: 1, mr: 1 }}
              >
                Finish
              </Button>
              <Button
                disabled={false}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </StepContent>
      </Step>
    </Stepper>
  );
};

export default MatchingFormSteps;
