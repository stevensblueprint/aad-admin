import { CircularProgress } from "@mui/material";

const DefaultLoadingPagePage = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-midnight-sky to-aero">
      <h1 className="p-4 font-sans text-4xl text-white">{message}</h1>
      <CircularProgress />
    </div>
  );
};

export default DefaultLoadingPagePage;
