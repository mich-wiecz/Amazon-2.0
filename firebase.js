import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCz-0E4C5hGasTmk8BaEHeBKgO3lxKTOmg",
    authDomain: "fir-51da4.firebaseapp.com",
    projectId: "fir-51da4",
    storageBucket: "fir-51da4.appspot.com",
    messagingSenderId: "390521285775",
    appId: "1:390521285775:web:39d175eaf9feadb4ac94fa"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

  const db = app.firestore()

  export default db