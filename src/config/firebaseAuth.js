import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.VITE_API_KEY,
  authDomain: import.meta.VITE_AUTH,
  projectId: import.meta.VITE_PR_ID,
  storageBucket: import.meta.VITE_STRG_BKT,
  messagingSenderId: import.meta.VITE_MSG_ID,
  appId: import.meta.VITE_APP_ID,
  measurementId: import.meta.VITE_MSR_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth , provider};