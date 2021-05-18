const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = (num) => {
    if (num === 0) {
        return '0';
    }
    let result = ''; 
    while (num > 0) {
        result = digits[num % 62] + result;
        num = parseInt(num / 62, 10);
    }
    return result;
};

const randomDigits = (len) => {
    let str = '';
    for (let i = 0; i < len; i++) {
        const idx = Math.floor(Math.random() * 62);
        str += digits.charAt(idx);
    }
    return str;
}

export {
    base62,
    randomDigits
}
