import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChatBubbleOutlineTwoTone, CommentOutlined } from "@mui/icons-material";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ChatBox() {
  const navigate = useNavigate();
  // states
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      room: data.get("room"),
    });
    const room = data.get("room");
    navigate(`/room?data=${room}`);
  };

  //sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAlertMessage({
        type: "success",
        message: "Logged out successfully!",
      });
      setToastOpen(true);
      navigate("/");
      console.log("singout chat room");
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: `Logout error: ${error.message}`,
      });
      setToastOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, p: 4, bgcolor: "secondary.main" }}>
            <ChatBubbleOutlineTwoTone />
            <CommentOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Chat Box
          </Typography>
          {alertMessage && (
            <Snackbar
              open={toastOpen}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              onClose={() => setToastOpen(false)}
              autoHideDuration={3000}
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="room"
              label="Enter room name"
              name="room"
              autoComplete="room"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              color="success"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enter Room
            </Button>
            <Button
              type="button"
              color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogout}
            >
              Exit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
