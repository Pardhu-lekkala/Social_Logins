import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { Firestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAp0AXPBQp-dr9YiePZHP9nShAwihT1aXk",
  authDomain: "fir-auth-admin-8b548.firebaseapp.com",
  projectId: "fir-auth-admin-8b548",
  storageBucket: "fir-auth-admin-8b548.appspot.com",
  messagingSenderId: "467309349910",
  appId: "1:467309349910:web:0bd4ba6c4127bef7fd3937",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const appleProvider = new OAuthProvider();
export const firestoreDb = getFirestore(app);
