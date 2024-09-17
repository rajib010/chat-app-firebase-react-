import React, { useState, useRef } from 'react'
import Auth from "./components/Auth.jsx"
import Chat from './components/Chat.jsx'
import Room from './components/Room.jsx'
import Cookies from "universal-cookie"
import { signOut } from 'firebase/auth'
import { auth } from "./firebase-config.js"


const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false)
    setRoom("")
  }

  const roomInputRef = useRef(null)
  if (!isAuth) {
    return (
      <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className='w-full h-screen overflow-hidden'>
      <div className="w-full flex justify-end">
        <button className="btn bg-red-600 m-5 text-white hover:bg-red-700" onClick={signUserOut}>Sign Out</button>
      </div>
      {room ? (
        <Chat room={room} />
      ) : <Room  roomInputRef={roomInputRef} setRoom={setRoom}/>}
    </div>
      )
}
export default App;