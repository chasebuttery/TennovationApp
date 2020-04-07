import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJVnoO1MSI3PWoFupBqH_K7P2VOCkkcb8",
    authDomain: "the-station-c5245.firebaseapp.com",
    databaseURL: "https://the-station-c5245.firebaseio.com",
    projectId: "the-station-c5245",
    storageBucket: "the-station-c5245.appspot.com",
    messagingSenderId: "487461900526",
    appId: "1:487461900526:web:7fced99b1bef874e4923ff",
    measurementId: "G-YBRBHFXBYK"
  };


  firebase.initializeApp(firebaseConfig)

  export default firebase;