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
    getAll(table = 'tutorials') {
        const tutorialsRef = ref(db, `/${table}`);
        return tutorialsRef;
    }

    create(data, table = 'tutorials') {
        const tutorialsRef = ref(db, `/${table}`);
        return push(tutorialsRef, data);
    }

    update(key, value, table = 'tutorials') {
        const tutorialRef = ref(db, `/${table}/${key}`);
        return update(tutorialRef, value);
    }

    delete(key, table = 'tutorials') {
        const tutorialRef = ref(db, `/${table}/${key}`);
        return remove(tutorialRef);
    }

    deleteAll(table = 'tutorials') {
        const tutorialsRef = ref(db, `/${table}`);
        return remove(tutorialsRef);
    }
}

export default new TutorialDataService();