import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { sentenceCase } from "../../utils/roles";
import PreferenceDragAndDrop from "./PreferenceDragAndDrop";

export type Preference = {
  name: string;
  id: string;
  firstLetter: string;
};

// Define the Zod schema for form validation
const formSchema = z.object({
  preferences: z
    .array(
      z.object({
        name: z.string(),
        id: z.string(),
        firstLetter: z.string(),
      }),
    )
    .min(5, "Minimum of 5 must be selected")
    .max(5, "Maximum of 5 must be selected"),
});

const MatchingFormSteps = ({
  menteeOrMentorText,
  preferenceOptions,
  onSubmit,
}: {
  menteeOrMentorText: string;
  preferenceOptions: Preference[];
  onSubmit: (preferences: Preference[]) => void;
}) => {
  const [preferences, setPreferences] = useState<Preference[]>([]);
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
    onSubmit(preferences);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onPreferenceChange = (val: Preference[]) => {
    setPreferences(val);
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
          <FormControl className="mb-2 mt-2 w-full">
            <Autocomplete
              multiple
              id="top-5-selected"
              options={preferenceOptions}
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
                  label={sentenceCase(menteeOrMentorText)}
                  placeholder={sentenceCase(menteeOrMentorText)}
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
          <Box>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  handleFirstStepSubmit() && handleNext();
                }}
                className="mr-1 mt-2"
              >
                Continue
              </Button>
              <Button
                disabled={true}
                onClick={handleBack}
                className="mr-1 mt-2"
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
            onChange={onPreferenceChange}
          />
          <Divider className="mb-4 mt-8" />
          <Box className="mb-1">
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  handleNext();
                  handleSubmit();
                }}
                className="mr-1 mt-2"
              >
                Finish
              </Button>
              <Button
                disabled={false}
                onClick={handleBack}
                className="mr-1 mt-2"
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
