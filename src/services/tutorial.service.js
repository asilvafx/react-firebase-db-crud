import { getDatabase, ref, push, update, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAgaZy99JtBp7_VTdA4XIfGu4NiEHYgX74",
    databaseURL: "https://react-firebase-db-crud-default-rtdb.europe-west1.firebasedatabase.app",
    authDomain: "react-firebase-db-crud.firebaseapp.com",
    projectId: "react-firebase-db-crud",
    storageBucket: "react-firebase-db-crud.firebasestorage.app",
    messagingSenderId: "561120720724",
    appId: "1:561120720724:web:57d1482aaecf098b407ac1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

class TutorialDataService {
    getAll() {
        const tutorialsRef = ref(db, '/tutorials');
        return tutorialsRef;
    }

    create(tutorial) {
        const tutorialsRef = ref(db, '/tutorials');
        return push(tutorialsRef, tutorial);
    }

    update(key, value) {
        const tutorialRef = ref(db, `/tutorials/${key}`);
        return update(tutorialRef, value);
    }

    delete(key) {
        const tutorialRef = ref(db, `/tutorials/${key}`);
        return remove(tutorialRef);
    }

    deleteAll() {
        const tutorialsRef = ref(db, '/tutorials');
        return remove(tutorialsRef);
    }
}

export default new TutorialDataService();