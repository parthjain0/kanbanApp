import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBhcCEofOtqUuXzpgwB7qsY_q85hFpcf-I',
  authDomain: 'kanbanapp1.firebaseapp.com',
  projectId: 'kanbanapp1',
  storageBucket: 'kanbanapp1.appspot.com',
  messagingSenderId: '443269919502',
  appId: '1:443269919502:web:37df9c954e06b51204dd5f',
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);
