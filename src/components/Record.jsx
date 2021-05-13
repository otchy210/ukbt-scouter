import React from 'react';
import { useParams } from 'react-router';

const Record = () => {
    const { recordId } = useParams();
    return <div>
        recordId: {recordId}
    </div>
}
export default Record;
