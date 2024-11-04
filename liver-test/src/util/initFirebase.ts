import admin from "firebase-admin";

if (!admin.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCvX8y2JHejGKN_FbcELmdIEp3lsLKJEiw",
    authDomain: "liver-test-firebase.firebaseapp.com",
    projectId: "liver-test-firebase",
    storageBucket: "liver-test-firebase.firebasestorage.app",
    messagingSenderId: "640327967528",
    appId: "1:640327967528:web:b5d34bae1cee510a43e61d",
  };
  admin.initializeApp(firebaseConfig);
}
