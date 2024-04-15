import { signIn } from "next-auth/react";
import { Button } from "@mui/material";

const PleaseSignInPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-midnight-sky to-aero">
      <h1 className="p-4 font-sans text-3xl text-white">
        Please Sign In to view this page
      </h1>
      <Button variant="outlined" onClick={() => void signIn()}>
        Sign In
      </Button>
    </div>
  );
};

export default PleaseSignInPage;
