
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyD5yaH_Gw7LXeTErKkrILLlHfWNrdhsp4Y",
    authDomain: "sansadmin-8dd8a.firebaseapp.com",
    projectId: "sansadmin-8dd8a",
    storageBucket: "sansadmin-8dd8a.appspot.com",
    messagingSenderId: "209561352013",
    appId: "1:209561352013:web:81798df33e713b5a0b2904",
    measurementId: "G-VT509QSBV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export const auth = getAuth(app);

export default storage