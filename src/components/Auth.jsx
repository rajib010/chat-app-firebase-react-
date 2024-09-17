import { useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie"


const cookies = new Cookies()
const Auth = ({setIsAuth}) => {
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
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <p>or</p>
      <button onClick={signinWithGoogle}>Sign in With Google</button>
    </div>
  );
};

export default Auth;
