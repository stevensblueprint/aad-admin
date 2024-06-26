import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type Route } from "nextjs-routes";
import * as React from "react";
import AvatarWrapper from "../settings/AvatarWrapper";

interface NavbarLink {
  name: string;
  path: Route["pathname"];
}

const pagesMenteeAndMentor: NavbarLink[] = [
  {
    name: "Directory",
    path: "/directory",
  },
];

const pagesAdmin: NavbarLink[] = [
  {
    name: "Directory",
    path: "/directory",
  },
  {
    name: "Admin",
    path: "/admin",
  },
  {
    name: "Collections",
    path: "/admin/collections",
  },
  {
    name: "Submissions",
    path: "/admin/submissions",
  },
];

function ResponsiveAppBar() {
  const { data: sessionData } = useSession();
  const pageOptions =
    sessionData?.user?.roleName === "ADMIN" ? pagesAdmin : pagesMenteeAndMentor;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          background: "#0E2D64",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className="mr-4 hidden font-mono font-bold text-inherit no-underline md:flex"
            >
              AAD
            </Typography>

            {/* Small View */}
            <Box className="flex grow md:hidden">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                className="block md:hidden"
              >
                {pageOptions.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    href={page.path}
                    className="my-4 block"
                  >
                    {page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Large View */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              className="mr-4 flex font-mono grow font-bold text-inherit no-underline md:hidden"
            >
              AAD
            </Typography>
            <Box className="hidden md:flex grow gap-1">
              {pageOptions.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={page.path}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box className="grow-0">
              {sessionData ? (
                <>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpenUserMenu} className="p-0">
                      <AvatarWrapper
                        alt={
                          sessionData?.user?.name
                            ? sessionData?.user?.name
                            : "user name"
                        }
                        src={
                          sessionData?.user?.image
                            ? sessionData?.user?.image
                            : ""
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      component={Link}
                      href={{
                        pathname: "/profiles/[id]",
                        query: { id: sessionData?.user?.id },
                      }}
                      onClick={handleCloseUserMenu}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href={{
                        pathname: "/settings/[id]",
                        query: { id: sessionData?.user?.id },
                      }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        sessionData
                          ? void signOut({ callbackUrl: "/" })
                          : void signIn();
                        handleCloseUserMenu();
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => void signIn()}
                  disableElevation
                >
                  Sign in
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
