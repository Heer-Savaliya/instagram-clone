import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3y2Gvd2ebviv_2fvbf1EHECVNtRMg_Ys",
  authDomain: "insta-clone-3903d.firebaseapp.com",
  projectId: "insta-clone-3903d",
  storageBucket: "insta-clone-3903d.firebasestorage.app",
  messagingSenderId: "715549363755",
  appId: "1:715549363755:web:a74377288f7596eb5b246e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Firestore services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
