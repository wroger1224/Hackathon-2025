// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
	getAuth,
	GoogleAuthProvider 
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Lnb-QNDgZRY29hrWyTmDr-WpJ-Cf4zc",
  authDomain: "activitytracker-273f3.firebaseapp.com",
  projectId: "activitytracker-273f3",
  storageBucket: "activitytracker-273f3.firebasestorage.app",
  messagingSenderId: "1080772859897",
  appId: "1:1080772859897:web:d7497380cec53d9dfc4f28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();