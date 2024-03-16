// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlVhzlku5x_ZiwYwR0IY1axpLjiT1iwtk",
  authDomain: "app-journal-58fc3.firebaseapp.com",
  projectId: "app-journal-58fc3",
  storageBucket: "app-journal-58fc3.appspot.com",
  messagingSenderId: "413266384903",
  appId: "1:413266384903:web:4a76909ef037e265ebf2a2",
  measurementId: "G-XZL2J8HH98"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );