import { provider, auth } from "../../config/firebase.config";
import { 
	signInWithPopup,
	signInWithEmailAndPassword, 
	signOut,
	createUserWithEmailAndPassword,
	onIdTokenChanged
} from 'firebase/auth';

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export async function signInWithEmailPassword(email, password){
	if(!email || !password) return;
	
	return await signInWithEmailAndPassword(auth, email, password);
}

export const createUser = async (email, password) => {
	if(!email || !password) return;
	
	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);
export const onIdTokenChangedListener = (callback) => onIdTokenChanged(auth, callback);

export const getCurrentUserToken = async () => {
	const currentUser = auth.currentUser;
	if (!currentUser) return null;
	return await currentUser.getIdToken();
};
