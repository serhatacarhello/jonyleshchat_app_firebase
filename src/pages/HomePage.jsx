import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import ChatBox from "./chat/ChatBox";
import Welcome from "./Welcome";
import { auth } from "../firebase/firebaseConfig";

export default function HomePage() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <div>
      Home
      {user ? <ChatBox /> : <Welcome />}
    </div>
  );
}
