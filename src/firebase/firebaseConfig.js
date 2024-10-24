// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ4LTzfi28xtzbfYEXE0kkYx_dSNI-d6w",
    authDomain: "punah-luga-2081.firebaseapp.com",
    projectId: "punah-luga-2081",
    storageBucket: "punah-luga-2081.appspot.com", // Only one storageBucket
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
const storage = getStorage(app); // Initialize storage

// Export the Firebase services you need
export { auth, database, storage, analytics };
