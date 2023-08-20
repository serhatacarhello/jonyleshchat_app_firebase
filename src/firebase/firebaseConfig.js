// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// authorization services
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//firestore
import { collection, getFirestore, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVqjk8dmuz8WEFOJcmCmhMg77QAKPg1BQ",
  authDomain: "jonyleshchat.firebaseapp.com",
  projectId: "jonyleshchat",
  storageBucket: "jonyleshchat.appspot.com",
  messagingSenderId: "252351214101",
  appId: "1:252351214101:web:aa806cd0a2aa39ad53941c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// firestore
export const db = getFirestore(app);

//assign  a collection name  for collection name in firebase
const messagesCollection = collection(db, "messages");

export async function createMessage(author, text, userPicture, room, userId) {
  try {
    const newMessage = {
      author,
      text,
      userId,
      userPicture,
      room,
      timestamp: serverTimestamp(),
    };

    await messagesCollection.add(newMessage);
    console.log("Mesaj oluşturuldu:", newMessage);
  } catch (error) {
    console.error("Mesaj oluşturulurken hata:", error);
  }
}
