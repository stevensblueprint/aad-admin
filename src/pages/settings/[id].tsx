import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import {
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DefaultLoadingPage from "../../components/loading/defaultLoadingPage";
import AvatarWrapper from "../../components/settings/AvatarWrapper";
import EditProfile from "../../components/settings/EditProfile";
import EditNotifications from "../../components/settings/EditNotifications";
import { type Data } from "../../components/settings/EditProfile";

type SideBarProps = {
  selectedIndex: number;
  handleListItemClick: (index: number) => void;
};

const Sidebar = ({ selectedIndex, handleListItemClick }: SideBarProps) => {
  type MenuItem = {
    text: string;
    icon: JSX.Element;
    index: number;
  };

  const menuItems: MenuItem[] = [
    {
      text: "Profile",
      icon: <AccountCircleIcon color="info" />,
      index: 0,
    },
    {
      text: "Notifications",
      icon: <NotificationsIcon color="info" />,
      index: 1,
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
            width: 250,
            backgroundColor: "transparent",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((item, _) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                handleListItemClick(item.index);
              }}
              selected={selectedIndex === item.index}
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }

  const settingsSections = [
    <EditProfile
      key="Profile"
      userData={data as Data}
      editMode={editMode}
      toggleEditMode={setEditMode}
    />,
    <EditNotifications key="Notifications" />,
  ];

  return (
    <>
      <Head>
        <title>Settings - AAD</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <div className="flex w-full flex-row">
          <Sidebar
            selectedIndex={selectedIndex}
            handleListItemClick={setSelectedIndex}
          />
          <div className="min-h-screen flex-grow bg-white px-6">
            <Stack direction="row" spacing={2} className="pt-6">
              <h1 className="text-4xl">Hi, {data.profile.preferredName}!</h1>
              <AvatarWrapper
                alt={data.name ? data.name : "user name"}
                src={data.image}
              />
            </Stack>
            {settingsSections[selectedIndex]}
          </div>
        </div>
      </main>
    </>
  );
}
