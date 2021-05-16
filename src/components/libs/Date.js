const formatTime = (time) => {
    const date = new Date(time);
    const yyyy = `${date.getFullYear()}`;
    const mo = `${date.getMonth() + 1}`.padStart(2, '0');
    const dd = `${date.getDate()}`.padStart(2, '0');
    const hh = `${date.getHours()}`.padStart(2, '0');
    const mi = `${date.getMinutes()}`.padStart(2, '0');
    const ss = `${date.getSeconds()}`.padStart(2, '0');
    return `${yyyy}-${mo}-${dd} ${hh}:${mi}:${ss}`;
};

export {
    formatTime
};
