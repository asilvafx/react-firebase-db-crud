import {equalTo, get, getDatabase, orderByChild, push, query, ref, remove, update} from "firebase/database";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytes} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

class DBService {

    // New method to get multiple items by a specific key-value pair
    getItemsByKeyValue(key, value, table) {
        const itemsRef = ref(db, `/${table}`);
        const q = query(itemsRef, orderByChild(key), equalTo(value));

        return get(q).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val(); // Return the data for the specific item(s)
            } else {
                return null; // Return null if no items match the query
            }
        });
    }

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

    // New method to get an item by a specific key-value pair
    getItemKey(key, value, table) {
        const itemsRef = ref(db, `/${table}`);
        const q = query(itemsRef, orderByChild(key), equalTo(value));

        return get(q).then((snapshot) => {
            if (snapshot.exists()) {
                const snapshotValue = snapshot.val();
                const userObj = Object.keys(snapshotValue);
                const getUserId = userObj[0];

                return getUserId; // Return the data for the specific item(s)
            } else {
                return null; // Return null if no items match the query
            }
        });
    }

    // Get an item by a id pair
    getItem(key, table) {
        const itemsRef = ref(db, `/${table}/${key}`);
        const q = query(itemsRef);

        return get(q).then((snapshot) => {
            if (snapshot.exists()) {
                const snapshotValue = snapshot.val();
                return snapshotValue; // Return the data for the specific item(s)
            } else {
                return null; // Return null if no items match the query
            }
        });
    }

    getAll(table) {
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
        const requestRef = ref(db, `/${table}/${key}`);
        return update(requestRef, value);
    }

    delete(key, table) {
        const requestRef = ref(db, `/${table}/${key}`);
        return remove(requestRef);
    }

    deleteAll(table) {
        const requestRef = ref(db, `/${table}`);
        return remove(requestRef);
    }

    // Method to upload an image and return the download URL
    async uploadImage(image, path) {
        const imageRef = storageRef(storage, path); // Renamed variable to avoid conflict
        const snapshot = await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }
}

export default new DBService();