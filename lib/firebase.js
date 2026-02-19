import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4euEHklGE3y8nfC4rca6b0N_fe-ec6Tc",
  authDomain: "fnsolution-5bec0.firebaseapp.com",
  projectId: "fnsolution-5bec0",
  storageBucket: "fnsolution-5bec0.firebasestorage.app",
  messagingSenderId: "940407699776",
  appId: "1:940407699776:web:c2b72b4fa5c2aab8fda2a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
