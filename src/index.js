import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = firebase.app();
        const db = app.database();
        const storage = app.storage();
        render(<App db={db} storage={storage}></App>, document.getElementById('app'));
    } catch (e) {
        console.error(e);
    }
});
