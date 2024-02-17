import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyAzxZIwsb__Af5vVPLJaIwCCESjuKOq-KM",
    authDomain: "imageuploader-4c427.firebaseapp.com",
    projectId: "imageuploader-4c427",
    storageBucket: "imageuploader-4c427.appspot.com",
    messagingSenderId: "135200863593",
    appId: "1:135200863593:web:9abede80e975bc9ca639f8",
    measurementId: "G-5EGXY1CL16"
  };
  

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database(); 
export const storage = firebase.storage();
export const db = firebase.firestore();


export default firebase;

