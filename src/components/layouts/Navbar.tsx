import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AvatarWrapper from "../settings/AvatarWrapper";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const pagesMenteeAndMentor = [
  {
    name: "Forms",
    path: "/forms",
  },
  {
    name: "Directory",
    path: "/directory",
  },
];

const pagesAdmin = [
  {
    name: "Forms",
    path: "/forms",
  },
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
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
              }}
              href="/"
            >
              AAD
            </Typography>

            {/* Small View */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pageOptions.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Button
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, display: "block" }}
                      href={page.path}
                    >
                      {page.name}
                    </Button>
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
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
              }}
            >
              AAD
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
            >
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

            <Box sx={{ flexGrow: 0 }}>
              {sessionData ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                      href={`/profiles/${sessionData?.user?.id}`}
                      onClick={handleCloseUserMenu}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        sessionData ? void signOut() : void signIn();
                        handleCloseUserMenu();
                      }}
                    >
                      Sign out
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href={`/settings/${sessionData?.user?.id}`}
                    >
                      Settings
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
