import { Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-midnight-sky to-aero">
      <h1 className="py-6 font-sans text-4xl text-white">
        404 - Page Not Found
      </h1>
      <div className="pb-10">
        <ErrorIcon sx={{ fontSize: 100, color: "white" }} />
      </div>
      <Button href="/" variant="contained">
        Return to Home
      </Button>
    </div>
  );
}
