// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-g3BT_2zhkSh7C_jIpwtYQmYu0AVCxhI",
  authDomain: "game-store-f14dd.firebaseapp.com",
  projectId: "game-store-f14dd",
  storageBucket: "game-store-f14dd.appspot.com",
  messagingSenderId: "32471478900",
  appId: "1:32471478900:web:15c6884a537bc6102a1721",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore();

export default db;
