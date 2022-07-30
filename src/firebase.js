// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwIMZsfd-CFuVUWcY6IDG48exJvTpDN8c",
  authDomain: "sparta-react-basic-ea15f.firebaseapp.com",
  projectId: "sparta-react-basic-ea15f",
  storageBucket: "sparta-react-basic-ea15f.appspot.com",
  messagingSenderId: "349749116501",
  appId: "1:349749116501:web:57e6ec42820ce1fbbc9edc",
  measurementId: "G-G9LHHK55XV",
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
