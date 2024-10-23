// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAJ4LTzfi28xtzbfYEXE0kkYx_dSNI-d6w",
    authDomain: "punah-luga-2081.firebaseapp.com",
    projectId: "punah-luga-2081",
    storageBucket: "punah-luga-2081.appspot.com",
    messagingSenderId: "218772783181",
    appId: "1:218772783181:web:d246a8e4502f8739dadc04",
    measurementId: "G-M75626VW5L",
    databaseURL: "https://punah-luga-2081-default-rtdb.firebaseio.com",

  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);


export { auth, database }; 