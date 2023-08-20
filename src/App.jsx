import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import ChatBox from "./pages/chat/ChatBox";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import RoomsPage from "./pages/RoomsPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
