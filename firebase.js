// firebase.js

import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC0NNzwaxWQKYTIcBrIfgic6FNCvIjrlyo",
    authDomain: "myerpapp-90365.firebaseapp.com",
    projectId: "myerpapp-90365",
    storageBucket: "myerpapp-90365.appspot.com",
    messagingSenderId: "1034387679001",
    appId: "1:1034387679001:web:569f5de92f583941408788"
  };

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
export { firebaseapp, db }; // Exporting firebaseapp to use in other files
