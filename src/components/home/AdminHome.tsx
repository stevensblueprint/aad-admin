import { Button } from "@mui/material";
import { type Session } from "next-auth";
import { useState } from "react";

export default function AdminHome({ sessionData }: { sessionData: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const name = sessionData?.user?.name ? sessionData.user.name : "Admin";

  // maybe it's a database thing?
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col md:px-32 px-5">
      <h1>Welcome, {name}!</h1>
      <p>Maybe KPIs and Dashboard information here...</p>
      <p>
        Should this whole page just redirect to <a href="/admin">/admin</a>{" "}
        route?
      </p>
      {/* can include percentage of mentees to fill out matching survey etc. */}
      <Button variant="contained" onClick={toggleForm}>
        {isOpen ? "Close Form" : "Open Form"}
      </Button>
    </div>
  );
}
