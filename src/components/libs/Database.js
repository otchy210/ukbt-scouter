import { formatTime } from "./Date.js";
import { useDatabase } from "./Firebase.js";

const useMeta = async () => {
    const database = useDatabase();
    const metaRef = database.ref('current/meta');
    const metaSnap = await metaRef.get();
    const meta = metaSnap.val();
    meta.dueDate = formatTime(meta.due);
    meta.isExpired = meta.due < Date.now();
    return meta;
};

const useRecent = async () => {
    return useRecords('current/recent');
};

const useRanking = async () => {
    return useRecords('current/ranking');
};

const useRecords = async (refPath) => {
    const database = useDatabase();
    const recordsRef = database.ref(refPath);
    const recordsSnap = await recordsRef.get();
    const keys = recordsSnap.val();
    if (!keys) {
        return [];
    }

    const queries = [];
    for (const key of keys) {
        const recordRef = database.ref(`current/records/${key}`);
        queries.push(recordRef.get());
    }
    const resultsSnap = await Promise.all(queries);

    const results = resultsSnap.map((resultSnap, idx) => {
        const result = resultSnap.val();
        result.key = keys[idx];
        return result;
    });
    return results;
};

const useRecord = async (key) => {
    const database = useDatabase();
    const recordRef = database.ref(`current/records/${key}`);
    const recordSnap = await recordRef.get();
    const record = recordSnap.val();
    if (!record) {
        throw new Error(`${key} is not a valid key.`);
    }
    record.key = key;
    return record;
};

export {
    useMeta,
    useRecent,
    useRanking,
    useRecord
};
