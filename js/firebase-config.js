// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
// 1. ADD THE STORAGE IMPORT HERE
import { getStorage } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";

import { 
    getDocs as firestoreGetDocs, 
    updateDoc as firestoreUpdateDoc,
    addDoc as firestoreAddDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

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
// 2. EXPORT STORAGE HERE
export const storage = getStorage(app);


// =========================================================================
// 3. AUTOMATED GLOBAL LOADING WRAPPERS
// =========================================================================

export async function autoGetDocs(queryInstance) {
    showGlobalLoader();
    try {
        return await firestoreGetDocs(queryInstance);
    } finally {
        hideGlobalLoader();
    }
}

export async function autoUpdateDoc(docRef, updateData) {
    showGlobalLoader();
    try {
        return await firestoreUpdateDoc(docRef, updateData);
    } finally {
        hideGlobalLoader();
    }
}

export async function autoAddDoc(collectionRef, data) {
    showGlobalLoader();
    try {
        return await firestoreAddDoc(collectionRef, data);
    } finally {
        hideGlobalLoader();
    }
}