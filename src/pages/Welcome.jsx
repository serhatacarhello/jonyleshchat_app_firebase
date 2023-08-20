import GoogleSignInLogo from "../assets/btn_google_signin.png";
import "../App.css";
import { Button } from "@mui/material";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    navigate("/chat");
  };
  return (
    <>
      <h1>JonyleshChat</h1>
      <div className="card">
        <Button
          variant="contained"
          color={"success"}
          // size="large"
          onClick={handleClick}
        >
          <img
            src={GoogleSignInLogo}
            className="logo"
            alt="Google sign in logo"
          />
        </Button>
        <p>Welcome to my chat app.</p>
      </div>
    </>
  );
}
