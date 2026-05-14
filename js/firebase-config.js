// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVIQytNF0kQ5ZZh1J8Uc56pHhoL1bG90M",
  authDomain: "utm-clinic-portal.firebaseapp.com",
  projectId: "utm-clinic-portal",
  storageBucket: "utm-clinic-portal.firebasestorage.app",
  messagingSenderId: "579361367162",
  appId: "1:579361367162:web:4e45c841ec63756aff07c3",
  measurementId: "G-W1LNRL2VVY"   // optional, you can keep it or remove it
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);