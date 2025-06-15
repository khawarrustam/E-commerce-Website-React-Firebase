// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA7yDEwI0YXdnkORvUk4MISiNxLvs7LPkA",
  authDomain: "e-commerce-lab-project.firebaseapp.com",
  projectId: "e-commerce-lab-project",
  storageBucket: "e-commerce-lab-project.firebasestorage.app",
  messagingSenderId: "841293608976",
  appId: "1:841293608976:web:abeb125303e79bb7a43295",
  measurementId: "G-HPK00N24TV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
const analytics = getAnalytics(app); 