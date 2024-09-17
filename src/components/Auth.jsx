import { useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie"


const cookies = new Cookies()
const Auth = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      setIsAuth(true)
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className='flex flex-col items-center h-full justify-center max-w-md m-auto gap-3 bg-slate-600 p-6 rounded-md shadow-lg'>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="email" className="grow" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd" />
        </svg>
        <input type="password" className="grow" placeholder='******' value={password} onChange={(e)=>setPassword(e.target.password)} />
      </label>
      <button className='btn w-full bg-blue-600 border-none text-white' onClick={login}>Login</button>
      <p>or</p>
      <button className='btn w-full bg-green-600 border-none text-white' onClick={signinWithGoogle}>Sign in With Google</button>
    </div>
  );
};

export default Auth;
