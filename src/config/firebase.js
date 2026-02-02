// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "student-dashboard-13652.firebaseapp.com",
  projectId: "student-dashboard-13652",
  storageBucket: "student-dashboard-13652.firebasestorage.app",
  messagingSenderId: "608262277561",
  appId: "1:608262277561:web:fca74cc79f1237e9a74e68",
  measurementId: "G-XYCL4M9TZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);