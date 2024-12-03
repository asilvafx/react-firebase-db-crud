import { getDatabase, ref, push, update, remove } from "firebase/database";
import { initializeApp } from "firebase/app"; 

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    databaseURL: process.env.DATABASE_URL,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
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