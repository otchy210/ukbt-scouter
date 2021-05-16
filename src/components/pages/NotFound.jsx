import React from 'react';
import { useLocation } from 'react-router';

const NotFound = () => {
    const { pathname } = useLocation();
    return <p>
        <mark class="inline-block secondary">{ pathname } は無効な URL です。</mark>
    </p>
};

export default NotFound;