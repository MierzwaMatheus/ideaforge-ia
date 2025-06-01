// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjiL_QzKr-CfNtw7Z4WAgYXMoM-tFWhHA",
  authDomain: "ideaforge-ia.firebaseapp.com",
  databaseURL: "https://ideaforge-ia-default-rtdb.firebaseio.com",
  projectId: "ideaforge-ia",
  storageBucket: "ideaforge-ia.firebasestorage.app",
  messagingSenderId: "54011411224",
  appId: "1:54011411224:web:60b39eb45cac0ce83fbc6d",
  measurementId: "G-XFDHJC05KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, getDatabase, ref, set, get, child };