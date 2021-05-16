import React from 'react';
import { useParams } from 'react-router';

const Record = () => {
    const { recordId } = useParams();
    return <>
        <h1>Otchy さん</h1>
        <p>
            <i>2021-05-16 15:19:45</i>
        </p>
        <p>
            <img src="https://dummyimage.com/640x800.png" style={{width: '100%'}} />
        </p>
    </>
}
export default Record;
