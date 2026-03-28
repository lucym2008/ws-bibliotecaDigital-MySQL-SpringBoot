import { auth, db } from './firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

export const authService = {
    async login(email: string, password: string): Promise<any> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },

    async register(email: string, password: string, name: string): Promise<any> {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name,
            email,
            role: 'USER',
            createdAt: Timestamp.now()
        });
        
        return userCredential.user;
    },

    async logout(): Promise<void> {
        await signOut(auth);
    },

    async getUserData(uid: string): Promise<any> {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }
};