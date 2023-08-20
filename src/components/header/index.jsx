import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import GoogleSignInLogo from "../../assets/btn_google_signin.png";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const pages = ["Rooms", "Trends", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isAuth, setIsAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // onAuthStateChanged is used in useEffect hook

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, [user]);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clidkck1");
    navigate("/");
    console.log("clidkck2");
  };

  const [alertMessage, setAlertMessage] = React.useState(null);
  const [toastOpen, setToastOpen] = React.useState(false);
  const handlePageClick = async (navItem) => {
    if (navItem === "Logout" && user) {
      try {
        await auth.signOut();
        setAlertMessage({
          type: "success",
          message: "Logged out successfully!",
        });
        setToastOpen(true);
        setTimeout(() => {
          setToastOpen(false);
          setAlertMessage(null);
        }, 2000);
        navigate("/");
      } catch (error) {
        setAlertMessage({
          type: "error",
          message: `Logout error: ${error.message}`,
        });
        setToastOpen(true);
        setTimeout(() => {
          setToastOpen(false);
          setAlertMessage(null);
        }, 2000);
      }
    } else {
      navigate("/" + navItem.toLowerCase());
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {alertMessage && (
          <Snackbar
            open={toastOpen}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setToastOpen(false)}
            autoHideDuration={2000}
          >
            <Alert
              onClose={() => setToastOpen(false)}
              severity={alertMessage.type}
              sx={{ width: "100%" }}
            >
              {alertMessage.message}
            </Alert>
          </Snackbar>
        )}
        <Toolbar disableGutters>
          <InsertCommentIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            style={{ cursor: "pointer" }}
            noWrap
            onClick={handleClick}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CHAT
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <InsertCommentIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            // component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CHAT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {isAuth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.displayName} src={user?.photoURL} />
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handlePageClick(setting);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!isAuth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button color="inherit" onClick={handleClick}>
                  Login
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
