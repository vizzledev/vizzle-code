import {initializeApp, getApp,getApps} from "firebase/app";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-api-key",
authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy.firebaseapp.com",
projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy.appspot.com",
messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "0",
appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:0:web:0",
measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-0",
};

// Only initialize on client side
let app;
let auth;
let firestore;

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  firestore = getFirestore(app);
}

export {auth, firestore,app};
export const googleProvider = typeof window !== 'undefined' ? new GoogleAuthProvider() : null;
export const facebookProvider = typeof window !== 'undefined' ? new FacebookAuthProvider() : null;
