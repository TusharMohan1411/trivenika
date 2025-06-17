import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBcrTeKoC0PywAYbJFSThnREQIvlzZN-c",
    authDomain: "blogs-prototype.firebaseapp.com",
    projectId: "blogs-prototype",
    storageBucket: "blogs-prototype.firebasestorage.app",
    messagingSenderId: "758141286992",
    appId: "1:758141286992:web:36f87315d5494ab036ef55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = typeof window !== "undefined" ? getAuth(app) : null;