// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-LMoDnrkz38Fy8V76HjPHFd-6svg9sa4",
  authDomain: "xpenso-194c9.firebaseapp.com",
  projectId: "xpenso-194c9",
  storageBucket: "xpenso-194c9.firebasestorage.app",
  messagingSenderId: "201688099764",
  appId: "1:201688099764:web:a92a5b098b107e241e60e1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(auth)

// auth.settings.appVerificationDisabledForTesting = true;

export { auth };
