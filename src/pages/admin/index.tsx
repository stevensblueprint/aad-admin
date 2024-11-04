import { Button } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState, type ReactElement } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { api } from "../../utils/api";

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewArchived, setViewArchived] = useState(false);

  const {
    data: kinMatchingCycle,
    error: kinMatchingCycleError,
    isLoading: kinMatchingCycleLoading,
  } = api.kinMatching.getKinMatchingForms.useQuery();

  console.log(kinMatchingCycle);
  const toggleKinMatchingForm = () => {
    setIsOpen(!isOpen);
  };

  const columns: GridColDef[] = [
    {
      field: "cycleName",
      headerName: "Cycle Name",
      width: 350,
      editable: false,
    },
    {
      field: "isOpen",
      headerName: "Open",
      width: 110,
      type: "boolean",
      editable: false,
    },
    {
      field: "archived",
      headerName: "Archived",
      width: 110,
      type: "boolean",
      editable: false,
    },
  ];

  const rows = kinMatchingCycle
    ? kinMatchingCycle.map((cycle) => {
        return {
          id: cycle.id,
          cycleName: cycle.cycleName,
          isOpen: cycle.isOpen,
          openAction: cycle.id,
          archived: cycle.archived,
          archivedAction: cycle.id,
        };
      })
    : [];

  return (
    <div className="flex min-h-screen flex-col p-8">
      <h1 className="py-2 my-0 text-4xl">Admin Page</h1>
      <p className="font-base py-2">Welcome to your main Admin Page!</p>
      <h2 className="py-2 my-0 text-3xl">Kin Mentorship Matching Forms</h2>
      <div className="inline">
        {isOpen ? (
          <Button
            variant="outlined"
            onClick={toggleKinMatchingForm}
            color="success"
          >
            Open Kin Mentorship Matching Form
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={toggleKinMatchingForm}
            color="error"
          >
            Close Kin Mentorship Matching Form
          </Button>
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          loading={kinMatchingCycleLoading}
        />
      </div>
    </div>
  );
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
