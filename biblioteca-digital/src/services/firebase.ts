import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQgOpE86hpfMirk1FPzo3E36xIJRVoAC4",
  authDomain: "projeto-0-2.firebaseapp.com",
  projectId: "projeto-0-2",
  storageBucket: "projeto-0-2.firebasestorage.app",
  messagingSenderId: "345165598499",
  appId: "1:345165598499:web:89f26103bb970475dbc696"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 