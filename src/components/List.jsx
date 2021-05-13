import React from 'react';
import { Link } from 'react-router-dom';

const List = () => {
    return <ul>
        <li><Link to="/record/1">record 1</Link></li>
        <li><Link to="/record/2">record 2</Link></li>
        <li><Link to="/record/3">record 3</Link></li>
    </ul>;
};

export default List;
