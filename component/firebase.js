import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAIZZEbw9UUe3QRXjhmB46mlQErX5ybhak",
//   authDomain: "student-a1bfc.firebaseapp.com",
//   projectId: "student-a1bfc",
//   storageBucket: "student-a1bfc.firebasestorage.app",
//   messagingSenderId: "971171113365",
//   appId: "1:971171113365:web:ece588fd716a0211a8ee9c",
//   measurementId: "G-EHTRDK2GRL"
// };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
