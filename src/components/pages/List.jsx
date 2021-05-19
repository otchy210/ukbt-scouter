import React, { useEffect, useState } from 'react';
import Loading from '../blocks/Loading.jsx';
import Records from '../blocks/Records.jsx';
import { useRecent } from '../libs/Database.js';

const List = () => {
    const [recent, setRecent] = useState();

    useEffect(async () => {
        const recent = await useRecent();
        setRecent(recent);
    }, []);

    if (!recent) {
        return <Loading />;
    }

    return <>
        <h1>一覧</h1>
        <Records records={recent} pagination={true} />
    </>;
};

export default List;
