import React from 'react';

const New = () => {
    return <>
        <h1>スクショの新規アップロード</h1>
        <form>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <label for="name">あなたの名前</label>
                    <input id="name"/>
                </div>
                <div className="col-sm-12 col-md-6">
                    <label for="file" class="button">スクショを選択</label>
                    <input type="file" id="file" style={{display: 'none'}}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <button class="primary">アップロード</button>
                </div>
            </div>
        </form>
    </>
};

export default New;