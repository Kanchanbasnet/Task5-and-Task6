import { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import  axios  from 'axios';
import { GoogleButton } from "react-google-button";

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserDetails from './userDetails';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const googleSignIn = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const googleSignOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        setUser(user);
        console.log('User is signed in');
        

      } else {
        console.log('User is signed out');
        setUser(null);

      }
    });
  }, []);
  const token = user?.accessToken
  const Register =  (token) => {
    axios.post('http://localhost:3000/users/auth/register', { token })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };
  
  console.log(token,"Token")
  return ( <>
       {!user ? (
        <GoogleButton onClick={googleSignIn}/>
      ) : (
        <div>
        <button onClick={googleSignOut}>Sign out with Google</button>
        <button onClick={()=>Register(token)}>Register</button>
       
        </div>
      )}
    </>
  );
}

export default App;
