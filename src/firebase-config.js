import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBtUIgWU0Qtcer0yFJsb6gBtqyewvZrBac",
  authDomain: "test-notification-f1fac.firebaseapp.com",
  projectId: "test-notification-f1fac",
  storageBucket: "test-notification-f1fac.appspot.com",
  messagingSenderId: "329919166273",
  appId: "1:329919166273:web:bfdb755d61e07b3516d3c0",
  measurementId: "G-1VVKN6KBNZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
