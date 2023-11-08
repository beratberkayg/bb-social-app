import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBILUW41awW-kIFCP-1hN8mz2xFon308V4",
  authDomain: "bbg-social-app.firebaseapp.com",
  projectId: "bbg-social-app",
  storageBucket: "bbg-social-app.appspot.com",
  messagingSenderId: "715391864334",
  appId: "1:715391864334:web:c2e467a97f750abb24765f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
