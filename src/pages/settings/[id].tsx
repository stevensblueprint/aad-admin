import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorPage from "../../components/error/error";
import DefaultLoadingPage from "../../components/loading/loading";
import AvatarWrapper from "../../components/settings/AvatarWrapper";
import EditNotifications from "../../components/settings/EditNotifications";
import EditProfile from "../../components/settings/EditProfile";
import { api } from "../../utils/api";

type SideBarProps = {
  selectedSection: string;
  handleListItemClick: (section: string) => void;
};

const Sidebar = ({ selectedSection, handleListItemClick }: SideBarProps) => {
  type MenuItem = {
    key: string;
    text: string;
    icon: JSX.Element;
  };

  const menuItems: MenuItem[] = [
    {
      key: "profile",
      text: "Profile",
      icon: <AccountCircleIcon color="info" />,
    },
    {
      key: "notifications",
      text: "Notifications",
      icon: <NotificationsIcon color="info" />,
    },
  ];

  return (
    <div className="flex">
      <Drawer
        variant="permanent"
        className="w-[250px] bg-transparent text-white"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            position: "relative",
            width: 250,
            color: "white",
            backgroundColor: "transparent",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <p className="mb-3 mt-6 text-center text-3xl text-white">Settings</p>
        <List>
          {menuItems.map((item, _) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                handleListItemClick(item.key);
              }}
              selected={selectedSection === item.key}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState("profile");

  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }

  return (
    <>
      <Head>
        <title>Settings - AAD</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <div className="flex w-full flex-row">
          <Sidebar
            selectedSection={selectedSection}
            handleListItemClick={setSelectedSection}
          />
          <div className="min-h-screen flex-grow bg-white px-6">
            <Stack direction="row" spacing={2} className="pt-6">
              <h1 className="text-4xl">Hi, {data.profile.preferredName}!</h1>
              <AvatarWrapper
                alt={data.name ? data.name : "user name"}
                src={data.image}
              />
            </Stack>
            {selectedSection === "profile" ? (
              <EditProfile
                preferredName={
                  data.profile?.preferredName
                    ? data.profile.preferredName
                    : "Missing Name"
                }
                email={data.email ? data.email : "Missing Email"}
                bio={data.profile?.bio ? data.profile.bio : "Missing Bio"}
                dateOfBirth={
                  data.profile?.dateOfBirth ? data.profile.dateOfBirth : ""
                }
                university={
                  data.profile?.university ? data.profile.university : ""
                }
                industries={
                  data.profile?.industries ? data.profile.industries : []
                }
              />
            ) : selectedSection === "notifications" ? (
              <EditNotifications />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
