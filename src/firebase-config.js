import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyjb3mQXy6GOTRG1bOe9PdzGFsLahl8bs",
  authDomain: "fir-react-todo-a5285.firebaseapp.com",
  projectId: "fir-react-todo-a5285",
  storageBucket: "fir-react-todo-a5285.appspot.com",
  messagingSenderId: "485322944658",
  appId: "1:485322944658:web:23d3a90c1a8ba1e196764b",
  measurementId: "G-XRD36KBRKE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
