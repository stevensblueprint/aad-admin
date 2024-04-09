"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button, Alert } from "@mui/material";

export default function Error({ errorMessage }: { errorMessage: string }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(errorMessage);
  }, [errorMessage]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-midnight-sky to-aero">
      <h1 className="pt-8 font-sans text-4xl text-white">
        Error - Something went wrong!
      </h1>
      <div className="pb-16 pt-4">
        <Alert severity="error">{errorMessage}</Alert>
      </div>
      <Button href="/" variant="contained">
        Return to Home
      </Button>
    </div>
  );
}
