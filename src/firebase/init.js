import firebase from "firebase";
import firestore from "firebase/firestore";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyB7_65ADYHksoChZL79_OvpURPnahKK4o8",
  authDomain: "ingredients-notepad.firebaseapp.com",
  databaseURL: "https://ingredients-notepad.firebaseio.com",
  projectId: "ingredients-notepad",
  storageBucket: "ingredients-notepad.appspot.com",
  messagingSenderId: "708145255612"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
