import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config.js';

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, 'messages');
  const user = auth.currentUser.displayName; // Current user
  const bottomRef = useRef(null); // Ref to scroll to bottom

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);

      // Scroll to the bottom after messages are loaded
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage('');
  };

  return (
    <div className="max-w-md rounded-lg p-4 m-auto flex items-center justify-center flex-col gap-3 border shadow-2xl">
      <h1 className="text-black text-3xl bg-yellow-200 w-full text-center p-2 rounded-2xl">
        Welcome to <span className="text-blue-900">{room}</span>
      </h1>

      <div className="max-h-[50vh] w-full p-4 overflow-y-scroll hide-scrollbar flex flex-col gap-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg shadow-md mb-3 max-w-xs ${message.user === user ? "bg-blue-500 text-white self-end text-right" : "bg-gray-300 text-black self-start text-left"}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <form className="flex gap-3 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your message"
          className="input input-bordered w-full max-w-xs"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn bg-green-600 text-white hover:bg-green-700" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
