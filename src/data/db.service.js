import { getDatabase, ref, push, update, remove, get, query, orderByChild, equalTo } from "firebase/database";
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

class DBService {

    // New method to get an item by a specific key-value pair
    getItemByKeyValue(key, value, table) {
        const itemsRef = ref(db, `/${table}`);
        const q = query(itemsRef, orderByChild(key), equalTo(value));

        return get(q).then((snapshot) => {
            if (snapshot.exists()) {
                const snapshotValue = snapshot.val();
                const userObj = Object.keys(snapshotValue);
                const getUserId = userObj[0];

                return snapshotValue[getUserId]; // Return the data for the specific item(s)
            } else {
                return null; // Return null if no items match the query
            }
        });
    }

    getAll(table) {
        const requestRef = ref(db, `/${table}`);
        return requestRef;

    }

    getAllPromise(table) {
        const requestRef = ref(db, `/${table}`);
        return get(requestRef).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val(); // Return the data
            } else {
                return {}; // Return an empty object if no data
            }
        });
    }

    create(data, table) {
        const requestRef = ref(db, `/${table}`);
        return push(requestRef, data);
    }

    update(key, value, table) {
        const tutorialRef = ref(db, `/${table}/${key}`);
        return update(tutorialRef, value);
    }

    delete(key, table) {
        const tutorialRef = ref(db, `/${table}/${key}`);
        return remove(tutorialRef);
    }

    deleteAll(table) {
        const requestRef = ref(db, `/${table}`);
        return remove(requestRef);
    }
}

export default new DBService();