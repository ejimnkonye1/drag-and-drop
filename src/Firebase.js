import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnzsXXER3CDm46XH6zVnnR4ptFUcvbDSE",
  authDomain: "drag-drop-gallery.firebaseapp.com",
  projectId: "drag-drop-gallery",
  storageBucket: "drag-drop-gallery.appspot.com",
  messagingSenderId: "420646710649",
  appId: "1:420646710649:web:746eb64bc2b013f6f9d3a8",
  measurementId: "G-QHMN5CB8YP"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

