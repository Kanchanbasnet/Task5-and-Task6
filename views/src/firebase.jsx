// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbY-REDa89HtOabqLg7_mZ1rNG_65AgHE",
  authDomain: "user-auth-2b987.firebaseapp.com",
  projectId: "user-auth-2b987",
  storageBucket: "user-auth-2b987.appspot.com",
  messagingSenderId: "440299032795",
  appId: "1:440299032795:web:78971bac67fb3af641fcfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
