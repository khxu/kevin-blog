import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDmff39xvsmWNObOnJbV4fnwRpNJBxby8o",
  authDomain: "kevin-blog-4b123.firebaseapp.com",
  databaseURL: "https://kevin-blog-4b123.firebaseio.com",
  projectId: "kevin-blog-4b123",
  storageBucket: "kevin-blog-4b123.appspot.com",
  messagingSenderId: "722698798642",
  appId: "1:722698798642:web:b50a4823293f19eeb01e2b"
};

firebase.initializeApp(firebaseConfig)

export default firebase;