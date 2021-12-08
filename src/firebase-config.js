import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8UzYD8BzvwodC9cLa3zuv4iSzmE-fFTA",
  authDomain: "fir-tut-44184.firebaseapp.com",
  projectId: "fir-tut-44184",
  storageBucket: "fir-tut-44184.appspot.com",
  messagingSenderId: "806838336044",
  appId: "1:806838336044:web:18f639dc3488bdb3156f89",
  measurementId: "${config.measurementId}",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
