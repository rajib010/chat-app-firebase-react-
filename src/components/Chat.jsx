import React,{useState} from 'react'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../firebase-config.js"

function Chat({room}) {

  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("")
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text"
          placeholder='Enter your message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} 
          />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Chat