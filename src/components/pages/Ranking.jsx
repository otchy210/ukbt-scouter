import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Loading from '../blocks/Loading.jsx';
import Records from '../blocks/Records.jsx';
import { useMeta, useRanking, useRecent } from '../libs/Database.js';
import { useDatabase } from '../libs/Firebase.js';

const Ranking = () => {
    const [ranking, setRanking] = useState();

    useEffect(async () => {
        const ranking = await useRanking();
        setRanking(ranking);
    }, []);

    if (!ranking) {
        return <Loading />;
    }

    const tryUpdateRanking = async () => {
        if (!confirm('Update ranking?')) {
            return;
        }
        const meta = await useMeta();
        const recent = await useRecent();
        const existingUser = {};
        const newRanking = recent.filter(record => {
            return !!record.score;
        }).map(record => {
            const diff = Math.abs(record.score - meta.target);
            record.diff = diff;
            return record;
        }).sort((left, right) => {
            const diffDiff = left.diff - right.diff;
            if (diffDiff !== 0) {
                return diffDiff;
            }
            return left.ts - right.ts;
        }).filter(record => {
            if (existingUser[record.name]) {
                return false;
            }
            return existingUser[record.name] = true;
        });
        const newRankingKeys = newRanking.map(record => record.key);
        const database = useDatabase();
        await database.ref('current/ranking').set(newRankingKeys);
        setRanking(newRanking);
    }

    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get('p') ?? 1);
    const firstRank = (page - 1) * 10 + 1;
return <>
        <h1 onDoubleClick={tryUpdateRanking}>
            ランキング
            <small>{firstRank} 〜 {firstRank + 10} 位</small>
        </h1>
        <Records records={ranking} mode="score" pagination={true} />
    </>
};

export default Ranking;