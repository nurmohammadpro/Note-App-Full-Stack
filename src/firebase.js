// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (Make sure it's correct)
const firebaseConfig = {
  apiKey: "AIzaSyAZdgUf1JkU717gHz5UvqhVb6SDZrCMRtY",
  authDomain: "full-stack-note-app.firebaseapp.com",
  projectId: "full-stack-note-app",
  storageBucket: "full-stack-note-app.appspot.com", // <-- FIXED storageBucket
  messagingSenderId: "631338624543",
  appId: "1:631338624543:web:63dc85c0598b5f38afd72a",
  measurementId: "G-18GKZHT8XL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
