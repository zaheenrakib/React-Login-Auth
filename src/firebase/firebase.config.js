// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVbECvXqwC6XRQgBY7SkZ9SBbe0NXQrts",
  authDomain: "react-login-auth-e7b70.firebaseapp.com",
  projectId: "react-login-auth-e7b70",
  storageBucket: "react-login-auth-e7b70.appspot.com",
  messagingSenderId: "423784955403",
  appId: "1:423784955403:web:bd205c2519dc6ae176110e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;