import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../blocks/Loading.jsx';
import Records from '../blocks/Records.jsx';
import { useMeta, useRanking, useRecent } from '../libs/Database.js';

const Home = () => {
    const [meta, setMeta] = useState();
    const [recent, setRecent] = useState();
    const [ranking, setRanking] = useState();

    useEffect(async () => {
        const meta = await useMeta();
        setMeta(meta);
    }, []);

    useEffect(async () => {
        const recent = await useRecent();
        setRecent(recent);
    }, []);

    useEffect(async () => {
        const ranking = await useRanking();
        setRanking(ranking);
    }, []);

    if (!meta) {
        return <Loading />
    }
    return <>
        <h1>スカウターチャレンジ</h1>
        {meta.isExpired &&
            <p>
                第 {meta.round} 回の募集は終了しました。
            </p>
        }
        {!meta.isExpired &&
            <table>
                <caption>第 {meta.round} 回開催中！</caption>
                <thead>
                    <tr>
                        <th>ターゲット</th>
                        <th>終了期限</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="ターゲット">{meta.target}</td>
                        <td data-label="終了期限">{meta.dueDate}</td>
                    </tr>
                </tbody>
            </table>
        }
        <h2>最新の 3 件</h2>
        {!recent && <Loading />}
        {recent && <Records records={recent} limit={3}/>}
        <p>
            <Link to="/list">全てのスクショを見る</Link>
        </p>
        <h2>トップ 3</h2>
        {!ranking && <Loading />}
        {ranking && <Records records={ranking} mode="score" limit={3}/>}
        <p>
            <Link to="/ranking">全てのランキングを見る</Link>
        </p>
        {!meta.isExpired && <>
            <h2>新規登録</h2>
            <p>
                <Link to="/new" class="button primary">スクショをアップロード</Link>
            </p>
        </>}
    </>
};

export default Home;