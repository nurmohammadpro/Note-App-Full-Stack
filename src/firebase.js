// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZdgUf1JkU717gHz5UvqhVb6SDZrCMRtY",
  authDomain: "full-stack-note-app.firebaseapp.com",
  projectId: "full-stack-note-app",
  storageBucket: "full-stack-note-app.firebasestorage.app",
  messagingSenderId: "631338624543",
  appId: "1:631338624543:web:63dc85c0598b5f38afd72a",
  measurementId: "G-18GKZHT8XL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export default { app, auth, db };
