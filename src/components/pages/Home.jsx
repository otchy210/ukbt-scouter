import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Records from '../blocks/Records.jsx';

const RightP = styled.p`
    text-align: right;
`;

const Home = () => {
    return <>
        <h1>スカウターチャレンジ<small>うかボツ非公認イベント</small></h1>
        <h2>最新の 3 件</h2>
        <Records/>
        <RightP>
            <Link to="/list">全てのスクショを見る</Link>
        </RightP>
        <h2>トップ 3</h2>
        <Records/>
        <RightP>
            <Link to="/ranking">トップ 10 を見る</Link>
        </RightP>
        <h2>新規登録</h2>
        <p>
            <Link to="/new" class="button primary">スクショをアップロード</Link>
        </p>
    </>
};

export default Home;