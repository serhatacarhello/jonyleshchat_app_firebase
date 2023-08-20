import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
// add doc to firestore
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebaseConfig";
import Message from "./chat/Message";
import { onAuthStateChanged } from "firebase/auth";

export default function RoomPage() {
  const [text, setText] = useState("");

  //  get room data from url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const room = queryParams.get("data");
  const navigate = useNavigate();

  // add messages to firestore
  // console.log("🚀 ~ file: RoomPage.jsx:37 ~ RoomPage ~ auth:", auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        setUser(user);
      } else {
        // User is signed out
        console.log("no user");
      }
    });
  });

  const userId = user?.uid;
  const userName = user?.displayName;
  const userPicture = user?.photoURL;

  // toast alert
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // get input value
  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log("inputValue", inputValue);
    setText(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleSubmit = async () => {
    if (text.trim() === "") return setOpen(true);
    try {
      const messagesRef = await addDoc(collection(db, "messages"), {
        text,
        author: userName,
        userId,
        userPicture,
        room,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", messagesRef.id);
      setText("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // get messages from firebase

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // create a query
  const messagesQuery = query(
    collection(db, "messages"),
    where("room", "==", room),
    orderBy("createdAt", "asc"),
    limit(50)
  );

  const scroll = useRef();

  // get messages from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        //name it as snapshot or whatever you want
        console.log(snapshot);

        const uniqueUsers = new Set();
        const messagesData = [];
        snapshot.forEach((doc) => {
          // to get data in doc use data() method
          // console.log("document", doc.data());
          const data = doc.data();
          messagesData.push(doc.data());
          console.log(data);
          uniqueUsers.add(data.author);
        });

        setMessages(messagesData);
        console.log("messages", messages);
        const usersData = Array.from(uniqueUsers);
        setUsers(usersData);
        console.log("users", usersData);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  // get users from firebase

  return (
    <>
      {!room ? (
        navigate("/chat")
      ) : (
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" color={"ButtonText"} sx={{ padding: 2 }}>
                {room.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container component={Paper} sx={{ height: "90vh" }}>
            <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
              {/* active user  */}
              <List>
                <ListItemButton key={userName}>
                  <ListItemIcon>
                    <Avatar alt={userName} src={userPicture} />
                  </ListItemIcon>
                  <ListItemText primary={userName} />
                </ListItemButton>
              </List>
              <Divider />
              <Grid item xs={12} sx={{ padding: 2 }}>
                <TextField
                  id="outlined-basic-email"
                  label="Search"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Divider />
              <List>
                {/* users  */}
                {users.map((user, i) => {
                  // for active user return
                  if (user === userName) return;
                  const userMessages = messages.filter(
                    (msg) => msg.author === user
                  );
                  const userPicture =
                    userMessages.length > 0
                      ? userMessages[0].userPicture
                      : null;

                  return (
                    <ListItemButton key={i}>
                      <ListItemIcon>
                        <Avatar alt={user} src={userPicture} />
                      </ListItemIcon>
                      <ListItemText primary={user} />
                      <ListItemText secondary="online" align="right" />
                    </ListItemButton>
                  );
                })}
                {/* Other ListItems */}
              </List>
            </Grid>
            <Grid item xs={9}>
              <List
                sx={{
                  height: "70vh",
                  overflowY: "auto",
                }}
              >
                {/* messages */}
                {messages.map((msg, i) => (
                  <Message key={i} msg={msg} activeUserId={userId} />
                ))}
                {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
                <span ref={scroll}></span>
              </List>
              <Divider />
              <Grid container sx={{ padding: "20px" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Enter a valid message!
                  </Alert>
                </Snackbar>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    name="text"
                    fullWidth
                    value={text}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid xs={1} align="right" pl={0.5}>
                  <Fab color="primary" aria-label="add" onClick={handleSubmit}>
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
