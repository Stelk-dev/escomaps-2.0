// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiUqTgyqsWOd-1ra8TBD170BdYVPWUj0w",
  authDomain: "escomaps.firebaseapp.com",
  projectId: "escomaps",
  storageBucket: "escomaps.appspot.com",
  messagingSenderId: "177220271180",
  appId: "1:177220271180:web:a44403efb2db0cdfdec8e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB
const DatabaseFirestore = getFirestore(app);

// Auth
const Auth = getAuth();
export { DatabaseFirestore, Auth };
