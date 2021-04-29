import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
    // // The Firebase SDK is initialized and available here!
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    try {
        const app = firebase.app();
        const features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        console.log(`Firebase SDK loaded with ${features.join(', ')}`);
    } catch (e) {
        console.error(e);
    }
    render(<App></App>, document.getElementById('app'));
});
