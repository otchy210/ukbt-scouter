import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyB1aWYo-n_Yhf6e7RNgDXLcGqVAjFcWsiI',
    authDomain: 'ukbt-scouter.firebaseapp.com',
    databaseURL: 'https://ukbt-scouter-default-rtdb.firebaseio.com',
    projectId: 'ukbt-scouter',
    storageBucket: 'ukbt-scouter.appspot.com',
    messagingSenderId: '950695494863',
    appId: '1:950695494863:web:5f120a25c3b62cc814e3ba'
};

let app;
const useApp = () => {
    if (!app) {
        firebase.initializeApp(config);
        app = firebase.app();
    }
    return app;
};

let storage;
const useStorage = () => {
    if (!storage) {
        const app = useApp();
        storage = app.storage();
    }
    return storage;
};

let database;
const useDatabase = () => {
    if (!database) {
        const app = useApp();
        database = app.database();
    }
    return database;
}

export {
    useApp,
    useDatabase,
    useStorage
};
