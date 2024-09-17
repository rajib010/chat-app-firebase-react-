import React,{useState, useRef} from 'react'
import Auth from "./components/Auth.jsx"
import Chat from './components/Chat.jsx'
import Cookies from "universal-cookie"


const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  console.log(room);
  

  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return <div>{room ? <Chat room={room}/> :
    <div>
      <label>Enter room name: </label>
      <input type="text"
        ref={roomInputRef} />
      <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
    </div>}</div>
}

export default App