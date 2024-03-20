import { useState } from "react";
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const EditNotifications = () => {
  const [mentorship, setMentorship] = useState(false);
  const [internship, setInternship] = useState(false);
  const [events, setEvents] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Handle form submission from this data here
    console.log({ mentorship, internship, events });
  };

  return (
    <>
      <div className="my-4 flex flex-col justify-center">
        <h3 className="justify-between text-2xl font-bold">Notifications</h3>
        <div className="my-4">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <FormControl>
              <FormLabel component="legend">
                Agree to be sent email from AAD regarding:
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mentorship}
                      onChange={(e) => setMentorship(e.target.checked)}
                    />
                  }
                  label="Mentorship"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={internship}
                      onChange={(e) => setInternship(e.target.checked)}
                    />
                  }
                  label="Relative Internship Opportunties"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={events}
                      onChange={(e) => setEvents(e.target.checked)}
                    />
                  }
                  label="Events"
                />
              </FormGroup>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: 100, marginTop: 2 }}
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditNotifications;
