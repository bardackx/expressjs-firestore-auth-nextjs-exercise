import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "liver-test-firebase.firebaseapp.com",
  projectId: "liver-test-firebase",
  storageBucket: "liver-test-firebase.firebasestorage.app",
  messagingSenderId: "640327967528",
  appId: "1:640327967528:web:b5d34bae1cee510a43e61d",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:39099");
  connectFirestoreEmulator(firestore, "localhost", 39097);
}

export { app, auth, firestore };
