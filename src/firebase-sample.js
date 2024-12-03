import * as firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "XXXXXXXXXXXXXXXXXX",
    databaseURL: "https://your-app-db-url.europe-west1.firebasedatabase.app",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.firebasestorage.app",
    messagingSenderId: "00000000000",
    appId: "your-app-id"
};


firebase.initializeApp(config);

export default firebase.database();