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
import FolderIcon from "@mui/icons-material/Folder";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/router";
import React, { useTransition } from "react";
import { useSession } from "next-auth/react";
import { type Route } from "nextjs-routes";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: Route["pathname"];
};

const menuItems: MenuItem[] = [
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
    text: "Directory",
    icon: <FolderIcon />,
    path: "/admin/directory",
  },
  {
    text: "Submissions",
    icon: <PublishIcon />,
    path: "/admin/submissions",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: sessionData } = useSession();

  const handleNavigation = (item: MenuItem) => {
    startTransition(() => {
      void router.push({ pathname: item.path} as Route);
    });
  };

  if (!sessionData || sessionData?.user?.roleName !== "ADMIN") {
    return children;
  }

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
      <main className="flex-grow px-6">{children}</main>
    </div>
  );
}
