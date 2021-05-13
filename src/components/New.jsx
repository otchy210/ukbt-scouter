import React from 'react';

const New = () => {
    return <>
        <div>
            <label>あなたの名前: <input name="name" /></label>
        </div>
        <div>
            <label>スクショ: <input type="file" /></label>
        </div>
    </>
};

export default New;