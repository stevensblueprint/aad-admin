import { type ReactElement, useState } from "react";
import { Button } from "@mui/material";
import { api } from "../../utils/api";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false);

	const toggleKinMatchingForm = () => {
    setIsOpen(!isOpen);
    
  };

  return (
    <div className="flex min-h-screen flex-col p-8">
      <h1 className="py-2 my-0 text-4xl">Admin Page</h1>
      <p className="font-base py-2">Admin page stuff would go here...</p>
      <h2 className="py-2 my-0 text-3xl">Kin Mentorship Matching Form</h2>
      <div className="inline">
        {isOpen ?   
          <Button variant="outlined" onClick={toggleKinMatchingForm} color="success">
            Open Kin Mentorship Matching Form
          </Button>
          :
          <Button variant="contained" onClick={toggleKinMatchingForm} color="error">
            Close Kin Mentorship Matching Form  
          </Button>
        }
      </div>
      
      
    </div>
  );
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
