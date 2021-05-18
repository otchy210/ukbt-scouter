class LocalStorage {
    getInt(key, defaultValue) {
        const strVal = this.getStr(key, defaultValue);
        return parseInt(strVal, 10);
    }
    getStr(key, defaultValue) {
        const value = window.localStorage.getItem(key);
        return value ?? defaultValue;
    }
    setInt(key, intValue) {
        window.localStorage.setItem(key, `${intValue}`);
    }
    setStr(key, strValue) {
        window.localStorage.setItem(key, strValue);
    }
}

const localStorage = new LocalStorage();

const useLocalStorage = () => {
    return localStorage;
}

export {
    useLocalStorage
}
