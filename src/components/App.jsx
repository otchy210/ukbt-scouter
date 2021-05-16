import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';
import New from './pages/New.jsx';
import NotFound from './pages/NotFound.jsx';
import Ranking from './pages/Ranking.jsx';
import Record from './pages/Record.jsx';

const App = (props) => {
    return <BrowserRouter>
        <header class="sticky">
            <Link to="/" className="button"><span class="icon-home"></span></Link>
            <Link to="/list" className="button">一覧</Link>
            <Link to="/ranking" className="button">ランキング</Link>
            <Link to="/about" className="button">これ is 何？</Link>
        </header>
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
            <Route path="/ranking">
                <Ranking />
            </Route>
            <Route path="/record/:recordId">
                <Record />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
        <footer>
            <p>
                <small>スカウターチャレンジ - うかボツ非公認イベント</small><br />
                <small>Presended by <a href="https://twitter.com/otchy" target="_blank">Otchy</a></small>
            </p>
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