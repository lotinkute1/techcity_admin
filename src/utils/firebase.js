// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX4M1iOXovCcrTh6ztYkyxeewBj2qGw24",
  authDomain: "techcitydb.firebaseapp.com",
  databaseURL: "https://techcitydb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "techcitydb",
  storageBucket: "techcitydb.appspot.com",
  messagingSenderId: "857408005498",
  appId: "1:857408005498:web:7f28312dec53887aab22c3",
  measurementId: "G-5W91SWYYNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);