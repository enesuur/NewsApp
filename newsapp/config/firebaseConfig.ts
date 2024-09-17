import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCicpfTcGI8bPAKmB4AqLxvk4CNi0vC-NI",
  authDomain: "myproject-4042a.firebaseapp.com",
  projectId: "myproject-4042a",
  storageBucket: "myproject-4042a.appspot.com",
  messagingSenderId: "656606150699",
  appId: "1:656606150699:web:e98c050e78ea6ca4e9aa6e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };