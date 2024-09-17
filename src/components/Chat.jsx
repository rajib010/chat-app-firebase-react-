import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { auth, db } from "../firebase-config.js"

function Chat({ room }) {

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([])
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = []
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      })
      setMessages(messages)
    });

    return () => unsubscribe();
  }, [])

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
      <div>{messages.map((message) =>
        <h1 key={message.id}>{message.text}</h1>
      )}
      </div>
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