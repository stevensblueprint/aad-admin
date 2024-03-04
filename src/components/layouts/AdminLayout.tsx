import {
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

const DRAWER_WIDTH = 240;

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

  const handleNavigation = async (item: MenuItem) => {
    const path = item.path;
    await router.push(path);
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        style={{ width: DRAWER_WIDTH }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {menuItems.map((item, _) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                void (async () => {
                  try {
                    await handleNavigation(item);
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
      <main style={{ flexGrow: 1, padding: "24px" }}>{children}</main>
    </div>
  );
}
