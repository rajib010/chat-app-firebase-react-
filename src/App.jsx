import React, { useState, useRef } from 'react'
import Auth from "./components/Auth.jsx"
import Chat from './components/Chat.jsx'
import Cookies from "universal-cookie"
import { signOut } from 'firebase/auth'
import {auth} from "./firebase-config.js"


const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  console.log(room);

  const signUserOut= async ()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false)
    setRoom("")
  }

  const roomInputRef = useRef(null)
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ?
        <Chat room={room} /> :
        <div>
          <label>Enter room name: </label>
          <input type="text"
            ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>}
        <div className="signout">
          <button onClick={signUserOut}>signout</button>
        </div>
    </>
  )
}
export default App