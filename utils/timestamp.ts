import { getUnixTime } from 'date-fns';

const getDefaultDateTime = () => {
    const d = new Date();
    return [
        d.toISOString(),
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
    ];
};

const getSafeDateTime = (timestamp: string) => {
    const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    return regex.exec(timestamp) ?? getDefaultDateTime();
};

const getDateObject = (timestamp = '') => {
    const ts = timestamp.trim();

    if (!ts.length) {
        return new Date();
    }

    const d = new Date(ts);

    if (d.getTime()) {
        return d;
    }

    const [_, year, month, day, hours, minutes, seconds] = getSafeDateTime(ts);
    return new Date(+year, +month, +day, +hours, +minutes, +seconds);
};

export const unix = (timestamp = '') => {
    return getUnixTime(getDateObject(timestamp));
};

export const convertMinutesToSeconds = (value: number) => value * 60;

export const convertMinutesToMilliseconds = (value: number) =>
    convertMinutesToSeconds(value) * 1000;
