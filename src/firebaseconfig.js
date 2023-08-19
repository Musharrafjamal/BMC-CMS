import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDWwR0AKnp3yk4aLZ9MWcKjcL_Bfq8rVjo",
  authDomain: "book-my-carrer.firebaseapp.com",
  projectId: "book-my-carrer",
  storageBucket: "book-my-carrer.appspot.com",
  messagingSenderId: "86775283250",
  appId: "1:86775283250:web:fc70d603e3861d6659062b",
  measurementId: "G-44S5FFCP1T"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const projectAuth = firebase.auth();
export const storage = getStorage(app);