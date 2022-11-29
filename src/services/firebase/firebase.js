// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA3tfdTGufcX7E8oGNu7nYD99iUYnBkKE",
  authDomain: "hospice-medical.firebaseapp.com",
  projectId: "hospice-medical",
  storageBucket: "hospice-medical.appspot.com",
  messagingSenderId: "9575432257",
  appId: "1:9575432257:web:d1bfa3dbce0f872a2646c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)