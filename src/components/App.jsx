import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import List from './List.jsx';
import New from './New.jsx';
import NotFound from './NotFound.jsx';
import Record from './Record.jsx';

const App = (props) => {
    return <BrowserRouter>
        <header>
            <h1>スカウターチャレンジ<small>うかボツ非公認イベント</small></h1>
        </header>
        <nav>
            <Link to="/">Home</Link> | <Link to="/list">List</Link>
        </nav>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/new">
                <New />
            </Route>
            <Route path="/list">
                <List />
            </Route>
            <Route path="/record/:recordId">
                <Record />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
        <footer>
            presended by <a href="https://twitter.com/otchy" target="_blank">Otchy</a>
        </footer>
    </BrowserRouter>
    // const {db, storage} = props;
    // const fileRef = useRef();
    // return <div>
    //     <button onClick={() => {
    //         const now = Date.now();
    //         const ref = db.ref('now');
    //         ref.set({now}, (error) => {
    //             if (error) {
    //                 console.error('something wrong', error);
    //             } else {
    //                 console.log('now is updated');
    //             }
    //         });
    //     }}>set now</button>
    //     <label style={{display: 'block', cursor: 'pointer'}}>
    //         Upload
    //         <input type="file" ref={fileRef} style={{display: 'none'}} onChange={() => {
    //             const fileInput = fileRef.current;
    //             if (fileInput.files.length === 0) {
    //                 return;
    //             }
    //             const file = fileInput.files[0];
    //             const fileName = file.name;
    //             storage.ref(`screenshots/${fileName}`).put(file).then((result) => {
    //                 console.log('file uploaded', result);
    //             });
    //         }} />
    //     </label>
    // </div>;
}

export default App;