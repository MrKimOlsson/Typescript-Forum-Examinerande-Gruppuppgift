import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQTnO-DoyE14y0dGV_1NO-rmdvrlTZdPs",
  authDomain: "typescript-forum.firebaseapp.com",
  projectId: "typescript-forum",
  storageBucket: "typescript-forum.appspot.com",
  messagingSenderId: "159255150123",
  appId: "1:159255150123:web:5623c4e2ea31a5ef81746e",
  measurementId: "G-7ZT24LQ6B6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);