import {
  Avatar,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Message(props) {
  const { i, msg, activeUserId } = props;
  const { author, userId, userPicture } = msg;
  // console.log(props);
  // console.log(props?.msg);

  //? other users status todo get it
  const userStatus = "offline";

  // userStatus
  const [activeUserStatus, setctiveUserStatus] = useState("offline");
  useEffect(() => {
    function handleOnlineStatusChange() {
      if (navigator.onLine) {
        setctiveUserStatus("online");
        console.log("User is online");
      } else {
        setctiveUserStatus("offline");
        console.log("User is offline");
      }
    }

    handleOnlineStatusChange();

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  if (activeUserId === msg?.userId) {
    //active user
    return (
      <ListItem
        sx={{
          bgcolor: "#757ce8",
          border: "1px solid gray",
          my: 2,
          borderRadius: " 15px 25px 0px 25px",
          textAlign: "start",
        }}
        key={i}
      >
        <ListItemText
          secondary={activeUserStatus}
          align="start"
          sx={{ pr: 4 }}
        />
        <ListItemText primary={msg?.text} sx={{ maxWidth: "85%" }} />
        {/* <ListItemText primary={author} /> */}
        <Tooltip title={author} placement="top">
          <ListItemIcon>
            <Avatar alt={author} src={userPicture} sx={{ ml: 1 }} />
          </ListItemIcon>
        </Tooltip>
      </ListItem>
    );
  } else {
    // different user
    return (
      <ListItem
        key={i}
        sx={{
          bgcolor: "cyan",
          border: "2px solid gray",
          borderRadius: " 25px 15px 25px 0px",
          my: 2,
        }}
      >
        <ListItemIcon>
          <Tooltip title={author} placement="top">
            <Avatar alt={author} src={userPicture} />
          </Tooltip>
        </ListItemIcon>

        {/* <ListItemText primary={author} /> */}
        <ListItemText primary={msg?.text} />
        <ListItemText secondary={userStatus} align="right" />
      </ListItem>
    );
  }
}
