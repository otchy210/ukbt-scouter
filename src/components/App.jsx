import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';
import New from './pages/New.jsx';
import NotFound from './pages/NotFound.jsx';
import Ranking from './pages/Ranking.jsx';
import Record from './pages/Record.jsx';

const App = () => {
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
            <Route path="/record/:recordKey">
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
}

export default App;