import React, {useRef} from 'react';

const App = (props) => {
    const {db, storage} = props;
    const fileRef = useRef();
    return <div>
        <button onClick={() => {
            const now = Date.now();
            const ref = db.ref('now');
            ref.set({now}, (error) => {
                if (error) {
                    console.error('something wrong', error);
                } else {
                    console.log('now is updated');
                }
            });
        }}>set now</button>
        <label style={{display: 'block', cursor: 'pointer'}}>
            Upload
            <input type="file" ref={fileRef} style={{display: 'none'}} onChange={() => {
                const fileInput = fileRef.current;
                if (fileInput.files.length === 0) {
                    return;
                }
                const file = fileInput.files[0];
                const fileName = file.name;
                storage.ref(fileName).put(file).then((result) => {
                    console.log('file uploaded', result);
                });
            }} />
        </label>
    </div>;
}

export default App;