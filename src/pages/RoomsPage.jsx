import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const uniqueRooms = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          uniqueRooms.add(data.room);
        });

        const roomsArray = Array.from(uniqueRooms);
        setRooms(roomsArray);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);
  const navigate = useNavigate();
  const handleRoomButtonClick = (room) => {
    navigate(`/room?data=${room}`);
  };

  console.log(rooms);

  return (
    <div>
      <h1>Rooms</h1>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <Button
              variant="outlined"
              sx={{ mb: 1, color: index % 2 === 0 ? "black" : "cyan" }}
              onClick={() => handleRoomButtonClick(room)}
            >
              {room}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
