import React from 'react';
import { useLocation } from 'react-router';

const NotFound = () => {
    const { pathname } = useLocation();
    return <div>
        { pathname } は無効な URL です。
    </div>
};

export default NotFound;