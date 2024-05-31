import EditNoteIcon from "@mui/icons-material/EditNote";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  type AlertColor,
} from "@mui/material";
import { type Session } from "next-auth";
import { useMemo } from "react";
import Error from "~/components/error/error";
import DefaultLoadingPage from "~/components/loading/loading";
import { api } from "~/utils/api";

export default function UserHome({ sessionData }: { sessionData: Session }) {
  const roleName = sessionData?.user?.roleName; // "MENTEE", "MENTOR", "ADMIN"

  const {
    data: collections,
    error: collectionError,
    isLoading: collectionLoading,
  } = api.collection.getCollections.useQuery();

  const {
    data: announcements,
    error: announcementsError,
    isLoading: announcementsLoading,
  } = api.announcement.getActiveAnnouncements.useQuery();

  const {
    data: kinMatchingCycle,
    error: kinMatchingCycleError,
    isLoading: kinMatchingCycleLoading,
  } = api.kinMatching.getOpenKinMatchingForms.useQuery();

  const userForms = useMemo(() => {
    if (!collections) return [];
    return collections.filter((collection) => {
      const isValid =
        collection.roles.some((role) => role.roleName === roleName) &&
        collection.isOpen;
      return isValid || roleName === "ADMIN";
    });
  }, [collections, roleName]);

  const matchingPageOpen = true;
  const matchingPageDeadline = "May 4th, 2024 11:59pm EST";

  if (collectionLoading) return <DefaultLoadingPage />;
  if (collectionError) return <Error errorMessage={collectionError.message} />;

  return (
    <div className="flex w-full flex-col px-4 py-6 md:px-32">
      <h1>Welcome, {sessionData.user?.name}!</h1>
      <div className="bg-blue-100 p-2 rounded-xl shadow-md">
        <h1 className="my-1 text-center">Announcements</h1>
        <div className="px-2 text-center">
          {announcementsLoading ? (
            <CircularProgress />
          ) : announcementsError ? (
            "There was an issue getting your announcments at this time. Try again later!"
          ) : announcements && announcements.length !== 0 ? (
            announcements.map((announcement) => (
              <Alert
                key={announcement.id}
                severity={announcement.type as AlertColor}
                className="p-2 rounded-xl my-2"
              >
                {announcement.message}
              </Alert>
            ))
          ) : (
            "No new announcments at this time. Check back later!"
          )}
        </div>
      </div>
      <h2 className="mb-0">Forms</h2>
      {kinMatchingCycle && kinMatchingCycle.length !== 0
        ? kinMatchingCycle.map((cycle) => {
            return (
              <div
                key={cycle.id}
                className="flex items-center bg-yellow-100 py-2 px-4 my-2 rounded-xl shadow-md"
              >
                <div className="flex-grow">
                  <h2 className="mt-2 mb-1">{cycle.formDisplayName}</h2>
                  <p className="mt-1">
                    The matching form is open! Press the button on the right to
                    begin. Please fill it out before{" "}
                    <u>{cycle.dueDate.toDateString()}</u>
                  </p>
                </div>
                <div className="flex-0 p-3">
                  <Tooltip title="Fill out matching form">
                    <IconButton
                      aria-label="Fill out matching form"
                      href="/matching"
                      className="border-4 border-black"
                    >
                      <GroupsIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            );
          })
        : null}
      {userForms && userForms.length !== 0 ? (
        userForms.map((form) => (
          <div
            key={form.id}
            className="flex items-center bg-gray-100 px-4 rounded-xl my-2 shadow-md"
          >
            <div className="flex-col grow">
              <h3 className="mb-1">{form.name}</h3>
              <p className="mt-1">{form.instructions}</p>
            </div>
            <div className="flex-0 p-3">
              <Tooltip title="Fill out form">
                <IconButton
                  aria-label="Fill out form"
                  href={"/form/" + form.id}
                >
                  <EditNoteIcon color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))
      ) : kinMatchingCycle && kinMatchingCycle.length !== 0 ? null : (
        <p className="text-center">
          There are no more forms required for you to fill out any forms at this
          time!
        </p>
      )}
    </div>
  );
}
