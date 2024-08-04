// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";



const firebaseConfig = {

  apiKey: "AIzaSyA2S7We13zR1DuAboikmiDl1cXLhKEswhg",

  authDomain: "todo-app-daddb.firebaseapp.com",

  projectId: "todo-app-daddb",

  storageBucket: "todo-app-daddb.appspot.com",

  messagingSenderId: "707362905528",

  appId: "1:707362905528:web:78cd77be50a8100cff434d",

  measurementId: "G-QH0F9DPELW"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

