import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-creds.json";

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore();

// const analytics = getAnalytics(app)
