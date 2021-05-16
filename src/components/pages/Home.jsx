import React from 'react';
import { Link } from 'react-router-dom';
import Records from '../blocks/Records.jsx';

const Home = () => {
    return <>
        <h1>スカウターチャレンジ</h1>
        <table>
            <caption>第 n 回開催中！</caption>
            <thead>
                <tr>
                    <th>ターゲット</th>
                    <th>締切日時</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="ターゲット">530000</td>
                    <td data-label="締切日時">yyyy-mm-dd 23:59:59</td>
                </tr>
            </tbody>
        </table>
        <h2>最新の 3 件</h2>
        <Records/>
        <p>
            <Link to="/list">全てのスクショを見る</Link>
        </p>
        <h2>トップ 3</h2>
        <Records/>
        <p>
            <Link to="/ranking">トップ 10 を見る</Link>
        </p>
        <h2>新規登録</h2>
        <p>
            <Link to="/new" class="button primary">スクショをアップロード</Link>
        </p>
    </>
};

export default Home;