import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatTime } from '../libs/Date';

const getMeta = (record, mode) => {
    switch (mode) {
        case 'ts':
            return formatTime(record.ts);
        case 'score':
            return record.score ?? formatTime(record.ts);
    }
    return '-';
}

const Records = (props) => {
    const records = props.records;
    const mode = props.mode ?? 'ts';
    const limit = props.limit ?? 10;
    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get('p') ?? 1);
    const offset = (page - 1) * limit;
    const pagination = props.pagination ?? false;
    const prevDisabled = offset === 0;
    const prevHref = page === 2 ? '?' : `?p=${page - 1}`;
    const nextDisabled = records.length <= offset + limit;
    const nextHref = `?p=${page + 1}`;
    return <>
        <ul>
            {records.slice(offset, offset + limit).map(record => {
                return <li>
                    <Link to={`/record/${record.key}`}>{record.name} さん [{getMeta(record, mode)}]</Link>
                </li>
            })}
        </ul>
        {pagination && <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    {prevDisabled ?
                        <button disabled>前へ</button> :
                        <Link to={prevHref} className="button">前へ</Link>
                    }
                </div>
                <div class="col-sm-6" style={{textAlign: 'right'}}>
                    {nextDisabled ?
                        <button disabled>次へ</button> :
                        <Link to={nextHref} className="button">次へ</Link>
                    }
                </div>
            </div>
        </div>}
    </>
};

export default Records;
