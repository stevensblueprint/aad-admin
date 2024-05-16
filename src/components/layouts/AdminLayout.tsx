import FolderSharedIcon from "@mui/icons-material/FolderShared";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PublishIcon from "@mui/icons-material/Publish";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type Route } from "nextjs-routes";
import React from "react";
import useProtectedPage from "../../utils/useProtectedPage";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: Route["pathname"];
}

const menuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
    path: "/admin",
  },
  {
    text: "Collections",
    icon: <InboxIcon />,
    path: "/admin/collections",
  },
  {
    text: "Forms",
    icon: <MailIcon />,
    path: "/admin/forms",
  },
  {
    text: "Submissions",
    icon: <PublishIcon />,
    path: "/admin/submissions",
  },
  {
    text: "Directory",
    icon: <FolderSharedIcon />,
    path: "/admin/directory",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useProtectedPage(["ADMIN"]);
  const router = useRouter();
  const { data: sessionData } = useSession();

  const handleNavigation = (item: MenuItem) => {
    void router.push({ pathname: item.path } as Route);
  };

  return (
    <div className="flex">
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            position: "relative",
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {menuItems.map((item, _) => (
            <ListItemButton
              selected={router.pathname === item.path}
              key={item.text}
              onClick={() => {
                void (() => {
                  try {
                    handleNavigation(item);
                  } catch (error) {
                    console.error(error);
                  }
                })();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <main className="flex-grow px-6">{children}</main>
    </div>
  );
}
