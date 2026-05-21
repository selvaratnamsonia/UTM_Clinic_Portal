// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// 1. IMPORT standard Firestore database operation methods directly
import { 
    getDocs as firestoreGetDocs, 
    updateDoc as firestoreUpdateDoc,
    addDoc as firestoreAddDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// 2. IMPORT your new global UI tracking components 
import { showGlobalLoader, hideGlobalLoader } from './global-loader.js';

const firebaseConfig = {
  apiKey: "AIzaSyCVIQytNF0kQ5ZZh1J8Uc56pHhoL1bG90M",
  authDomain: "utm-clinic-portal.firebaseapp.com",
  projectId: "utm-clinic-portal",
  storageBucket: "utm-clinic-portal.firebasestorage.app",
  messagingSenderId: "579361367162",
  appId: "1:579361367162:web:4e45c841ec63756aff07c3",
  measurementId: "G-W1LNRL2VVY" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// =========================================================================
// 3. AUTOMATED GLOBAL LOADING WRAPPERS
// =========================================================================

// Automatic Wrapper for Fetching Data Docs (e.g., loading tables)
export async function autoGetDocs(queryInstance) {
    showGlobalLoader();
    try {
        return await firestoreGetDocs(queryInstance);
    } finally {
        hideGlobalLoader();
    }
}

// Automatic Wrapper for Updating Documents (e.g., canceling/claiming appointments)
export async function autoUpdateDoc(docRef, updateData) {
    showGlobalLoader();
    try {
        return await firestoreUpdateDoc(docRef, updateData);
    } finally {
        hideGlobalLoader();
    }
}

// Automatic Wrapper for Creating Documents (e.g., booking an appointment)
export async function autoAddDoc(collectionRef, data) {
    showGlobalLoader();
    try {
        return await firestoreAddDoc(collectionRef, data);
    } finally {
        hideGlobalLoader();
    }
}