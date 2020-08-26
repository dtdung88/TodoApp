import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBUdM8vwQ9QC67piobAVQOf2JEWeBYSrX4",
    authDomain: "todo-app-myself.firebaseapp.com",
    databaseURL: "https://todo-app-myself.firebaseio.com",
    projectId: "todo-app-myself",
    storageBucket: "todo-app-myself.appspot.com",
    messagingSenderId: "46331041469",
    appId: "1:46331041469:web:7611a2964c8e76221d89d4",
    measurementId: "G-SPKTVZ8E27"
});

const db = firebaseApp.firestore();

export default db;
