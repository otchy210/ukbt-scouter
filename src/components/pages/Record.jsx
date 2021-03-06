import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../blocks/Loading.jsx';
import { useMeta, useRecord } from '../libs/Database.js';
import { formatTime } from '../libs/Date.js';
import { isAdminLoggedIn, useDatabase } from '../libs/Firebase.js';
import NotFound from './NotFound.jsx';

const Record = () => {
    const { recordKey } = useParams();
    const [status, setStatus] = useState('loading');
    const [meta, setMeta] = useState();
    const [record, setRecord] = useState();

    useEffect(async () => {
        const meta = await useMeta();
        setMeta(meta);
        const record = await useRecord(recordKey).catch(err => {
            console.error(err);
            setStatus('notFound');
        });
        if (record) {
            setRecord(record);
            setStatus('loaded');
        }
    }, []);

    if (status === 'loading') {
        return <Loading />;
    } else if (status === 'notFound') {
        return <NotFound />;
    }

    const tryEdit = async () => {
        if (!isAdminLoggedIn()) {
            return;
        }
        const scoreStr = prompt('score?', record.score ?? '');
        const score = parseInt(scoreStr);
        const storedRecord = await useRecord(recordKey);
        const newRecord = {
            ...storedRecord,
            score
        };
        const database = useDatabase();
        await database.ref(`current/records/${recordKey}`).set(newRecord);
        setRecord(newRecord);
    };

    const diff = record.score - meta.target;
    return <>
        <h1>
            <span onDoubleClick={tryEdit}>{record.name}</span> さん
            {record.score && <small>戦闘力: {record.score} [{diff > 0 ? `+${diff}` : diff}]</small>}
        </h1>
        <p>
            <i>{formatTime(record.ts)}</i>
        </p>
        <p style={{textAlign: 'center'}}>
            <img
                src={`https://storage.googleapis.com/ukbt-scouter.appspot.com/screenshots/r${meta.round}/${record.key}`}
                style={{
                    width: '100%',
                    maxWidth: '480px'
                }}
            />
        </p>
    </>
}
export default Record;
