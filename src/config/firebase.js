import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu1ootv0xVNtPQdvqeeSf-o967tT35kXs",
  authDomain: "tuitionapp-96931.firebaseapp.com",
  projectId: "tuitionapp-96931",
  storageBucket: "tuitionapp-96931.firebasestorage.app",
  messagingSenderId: "220299209957",
  appId: "1:220299209957:web:b4fa2bc2f828cd2dd6780c",
  measurementId: "G-57VQS50L4J",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
