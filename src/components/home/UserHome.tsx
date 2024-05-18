
import { IconButton, Tooltip, Alert, type AlertColor } from "@mui/material";
import { type Session } from "next-auth";
import { useMemo } from "react";
import Error from "~/components/error/error";
import DefaultLoadingPage from "~/components/loading/loading";
import { api } from "~/utils/api";
import EditNoteIcon from '@mui/icons-material/EditNote';
import GroupsIcon from '@mui/icons-material/Groups';

export default function UserHome({ sessionData } : { sessionData: Session }) {
  const roleName = sessionData?.user?.roleName; // "MENTEE", "MENTOR", "ADMIN"

  const {
    data: collections,
    error: collectionError,
    isLoading: collectionLoading,
  } = api.collection.getCollections.useQuery();

  const userForms = useMemo(() => {
      if (!collections) return [];
      return collections.filter((collection) => {
        const isValid = collection.roles.some((role) => role.roleName === roleName) && collection.isOpen;
        return isValid || (roleName === "ADMIN");
      });
  }, [collections, roleName]);

  // Hardcoded announcements and matching page open status for no 
  const announcements = [
    { id: 1, type: 'info', message: 'The 2024 Kin Mentorship Matching page is now live!' },
    { id: 2, type: 'warning', message: 'Site maintanence will be occuring from Friday, May 4th 12am EST to Sunday, May 6th 8am EST. We apologize for any inconveniences this may cause.' },
  ];
  const matchingPageOpen = true;
  const matchingPageDeadline = "May 4th, 2024 11:59pm EST";

  if (collectionLoading) return <DefaultLoadingPage />;
  if (collectionError) return <Error errorMessage={collectionError.message}/>

  return (
    <>
    <div className="flex w-full flex-col px-4 py-6 md:px-32">
      <h1>Welcome, {sessionData.user?.name}!</h1>
      <div className="bg-blue-100 p-2 rounded-xl shadow-md">
        <h1 className="my-1 text-center">
          Announcements
        </h1>
        <p className="px-2 text-center">
          {announcements ? 
            announcements.map((announcement) => (
              <Alert key={announcement.id} severity={announcement.type as AlertColor} className="p-2 rounded-xl my-2">
                {announcement.message}
              </Alert>
            )) : "No new announcments at this time. Check back later!"
          }
        </p>
      </div>
      <h2 className="mb-0">Forms</h2>
      {matchingPageOpen && (
        <div className="flex items-center bg-yellow-100 py-2 px-4 my-2 rounded-xl shadow-md">
          <div className="flex-grow">
            <h2 className="mt-2 mb-1">
              Kin Mentorship Program Matching Form
            </h2>
            <p className="mt-1">
              The matching form is now open! Please fill out the form before <u>{matchingPageDeadline}</u>
            </p>
          </div>
          <div className="flex-0 p-3">
            <Tooltip title="Fill out matching form">
              <IconButton aria-label="Fill out matching form" href="/matching">
                <GroupsIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
      {userForms.map((form) => (
        <div key={form.id} className="flex items-center bg-gray-100 px-4 rounded-xl my-2 shadow-md">
          <div className="flex-col grow">
            <h3 className="mb-1" >{form.name}</h3>
            <p className="mt-1">{form.instructions}</p>
          </div>
          <div className="flex-0 p-3">
            <Tooltip title="Fill out form">
              <IconButton aria-label="Fill out form" href={'/form/'+form.id}>
                <EditNoteIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}