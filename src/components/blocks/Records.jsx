import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../libs/Date';

const Records = ({ records }) => {
    return <ul>
        {records.map(record => {
            return <li>
                <Link to={`/record/${record.key}`}>{record.name} さん ({formatTime(record.ts)})</Link>
            </li>
        })}
    </ul>
};

export default Records;
