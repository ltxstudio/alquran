// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm-rWGR5WMZYRgxNXIhyUxNfJ8yeHBB0Q",
  authDomain: "alquranbn.firebaseapp.com",
  projectId: "alquranbn",
  storageBucket: "alquranbn.appspot.com",
  messagingSenderId: "467003052557",
  appId: "1:467003052557:web:ecf0ce0f3b63a11e76bb44",
  measurementId: "G-JXSS9XSQPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
