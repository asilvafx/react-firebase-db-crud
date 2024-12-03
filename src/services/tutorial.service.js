import { ref, push, update, remove } from "firebase/database";
import database from "../firebase";

const db = database;

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