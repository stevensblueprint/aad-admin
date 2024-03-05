import {
  CircularProgress,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import { type Route } from "nextjs-routes";
import React, { useTransition } from "react";

type MenuItem = {
  text: string;
  icon: JSX.Element;
  path: "/" | Route;
};

const menuItems: MenuItem[] = [
  {
    text: "Collections",
    icon: <InboxIcon />,
    path: "/",
  },
  {
    text: "Forms",
    icon: <MailIcon />,
    path: "/",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (item: MenuItem) => {
    startTransition(() => {
      router.push(item.path).catch((error) => console.error(error));
    });
  };

  return (
    <div className="flex">
      <Drawer
        variant="permanent"
        className="w-80"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {menuItems.map((item, _) => (
            <ListItemButton
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
              disabled={isPending}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {isPending && <CircularProgress />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
