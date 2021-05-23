import React, { useEffect, useState } from 'react';
import Loading from '../blocks/Loading.jsx';
import Records from '../blocks/Records.jsx';
import { useRanking } from '../libs/Database.js';

const Ranking = () => {
    const [ranking, setRanking] = useState();

    useEffect(async () => {
        const ranking = await useRanking();
        setRanking(ranking);
    }, []);

    if (!ranking) {
        return <Loading />;
    }

return <>
        <h1>ランキング</h1>
        <Records records={ranking} mode="score" pagination={true} />
    </>
};

export default Ranking;