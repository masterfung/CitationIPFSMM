// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword,signInAnonymously } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
// import { getAuth, createUserWithEmailAndPassword } from import { initializeApp } from
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
// import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

// const firebaseInit = () => {
require('dotenv').config();

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
// };
// Your web app's Firebase configuration

// const firebaseConfig = {
//     apiKey: "AIzaSyC1rJU4UqpsDAzVlVLR74x7Os3jC7-81fY",
//     authDomain: "project-7c230.firebaseapp.com",
//     projectId: "project-7c230",
//     storageBucket: "project-7c230.appspot.com",
//     messagingSenderId: "530437029725",
//     appId: "1:530437029725:web:b18aa5ebfea31b102f32b4"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBvOw6cNjlJBvEr31z_fKkK5G-rSchZ8GE",
    authDomain: "citationipfsmm.firebaseapp.com",
    projectId: "citationipfsmm",
    storageBucket: "citationipfsmm.appspot.com",
    messagingSenderId: "776952237060",
    appId: "1:776952237060:web:5592f97f2badcb0e23f951"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.name);  // "[DEFAULT]"
// Option 2: Access Firebase services using shorthand notation
const defaultStorage = getStorage(app);
// let defaultFirestore = getFirestore();
export const db = getFirestore(app);
console.log(db);  // "[DEFAULT]"

// return db;

// }



// export default db;
