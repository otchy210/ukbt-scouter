import React, { useEffect, useRef, useState } from 'react';
import Loading from '../blocks/Loading.jsx';
import { useMeta } from '../libs/Database.js';
import { useDatabase, useStorage } from '../libs/Firebase.js';
import { useLocalStorage } from '../libs/LocalStorage.js';
import { base62, randomDigits } from '../libs/Number.js';

const generateKey = (ts, name) => {
    const tsHash = base62(ts).substr(2);
    let nameNumStr = '';
    for (let i = 0; i < name.length; i++) {
        nameNumStr += `${name.charCodeAt(i)}`;
    }
    const nameNum = parseInt(nameNumStr.substr(0, 16), 10);
    const nameHash = base62(nameNum);
    const randomLen = 16 - tsHash.length - nameHash.length;
    const randomHash = randomDigits(randomLen);
    return tsHash + nameHash + randomHash;
};

const New = () => {
    const localStorage = useLocalStorage();
    const [meta, setMeta] = useState();
    const [name, setName] = useState(localStorage.getStr('name', ''));
    const fileRef = useRef();
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(async () => {
        const meta = await useMeta();
        setMeta(meta);
    }, []);

    const validate = () => {
        const errors = [];
        if (name.length === 0) {
            errors.push('あなたの名前を入力して下さい。');
        } else if (name.length > 20) {
            errors.push('あなたの名前は 20 文字以内で入力して下さい。');
        }
        const fileInput = fileRef.current;
        if (fileInput.files.length === 0) {
            errors.push('スクショを選択して下さい。');
        } else {
            const file = fileInput.files[0];
            if (file.type.indexOf('image/') !== 0) {
                errors.push('アップロードできるのは画像ファイルだけです。');
            } else if (file.size > 5 * 1024 * 1024) {
                errors.push('アップロードできるファイルは 5 MB までです。');
            }
        }
        setErrors(errors);
        return errors.length === 0;
    }

    const submit = async () => {
        setIsSubmitting(true);

        const ts = Date.now();
        const key = generateKey(ts, name);

        const storage = useStorage();
        const filePath = `screenshots/r${meta.round}/${key}`;
        const fileInput = fileRef.current;
        const file = fileInput.files[0];
        await storage.ref(filePath).put(file);

        const database = useDatabase();
        await database.ref(`current/records/${key}`).set({
            name,
            ts
        });
        const recentRef = database.ref('current/recent');
        const recentSnap = await recentRef.get();
        const recent = recentSnap.val() ?? [];
        recent.unshift(key);
        await recentRef.set(recent);

        setFileName('');
        fileInput.value = '';
        setNotifications(['アップロードが完了しました。']);

        setIsSubmitting(false);
    };

    if (!meta) {
        return <Loading />
    }

    return <>
        <h1>スクショの新規アップロード</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
        }}>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <label for="name">あなたの名前</label>
                    <input 
                        id="name"
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        onBlur={e => {
                            localStorage.setStr('name', e.target.value);
                        }}
                    />
                </div>
                <div className="col-sm-12 col-md-6">
                    <label for="file" class="button">スクショを選択</label>
                    <input
                        type="file"
                        id="file"
                        ref={fileRef}
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={() => {
                            const fileInput = fileRef.current;
                            if (fileInput.files.length === 0) {
                                setFileName('');
                            } else {
                                setFileName(fileInput.files[0].name);
                            }
                        }}
                    />
                    {fileName}
                </div>
            </div>
            <div className="row">
                {errors.length > 0 ? 
                    <div className="col-sm-12">
                        <ul>
                            {errors.map(err => <li><mark class="secondary">{ err }</mark></li>)}
                        </ul>
                    </div>
                : null}
                {notifications.length > 0 ? 
                    <div className="col-sm-12">
                        <ul>
                            {notifications.map(notification => <li><mark class="primary">{ notification }</mark></li>)}
                        </ul>
                    </div>
                : null}
                <div className="col-sm-12" style={{textAlign: 'right'}}>
                    <button
                        class="primary"
                        onClick={() => {
                            setNotifications([]);
                            if (!validate()) {
                                return;
                            }
                            submit();
                        }}
                        disabled={isSubmitting}
                    >アップロード{isSubmitting && <div class="spinner" style={{
                        width: '.5rem',
                        height: '.5rem',
                        margin: 0,
                        borderLeftColor: 'transparent',
                        borderWidth: '.2rem'
                    }}></div>}</button>
                </div>
            </div>
        </form>
    </>
};

export default New;