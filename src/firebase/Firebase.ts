import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmvniByANWLr18SNpPmYNX3Wm3jDeFG3w",
  authDomain: "degitallibrary.firebaseapp.com",
  projectId: "degitallibrary",
  storageBucket: "degitallibrary.appspot.com",
  messagingSenderId: "801200907372",
  appId: "1:801200907372:web:94cc62d466723aedb02449",
  measurementId: "G-0MNDJY2Y3P",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
