import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import moment from "moment/moment";
import { ExpandMore } from "@mui/icons-material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function Profile() {
  //   const [expanded, setExpanded] = React.useState(false);

  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    console.log("user", user);
  });

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  if (!user) return;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label={user.displayName}
              src={user.photoURL}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user.displayName}
          subheader={moment(user.metadata.creationTime).format("YYYY/MM/DD")}
        />
        <CardMedia
          component="img"
          height="194"
          src="https://picsum.photos/200/300"
          alt={user.displayName}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Email:{user.email}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore sx={{ ml: "auto" }}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </div>
  );
}
