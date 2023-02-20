import { describe, it, expect } from 'vitest';
import {
    addHour,
    addMonth,
    addYear,
    formatDate,
    getAllMonths,
    getSetAmountOfYears,
    setDoubleDigits,
    unix,
} from './timestamp';

describe('timestamp hour', () => {
    it('should add 1 hour to current datetime', () => {
        const actual = addHour(1);
        const d = new Date();
        d.setHours(d.getHours() + 1);
        expect(actual.toISOString()).toEqual(d.toISOString());
    });

    it('should add 2 hours to specific datetime', () => {
        const d = new Date('06/02/2017 15:05:08');
        const actual = addHour(2, d.toISOString());
        d.setHours(d.getHours() + 2);
        expect(actual.toISOString()).toBe(d.toISOString());
    });
});

describe('timestamp months', () => {
    it('should add 1 month to current datetime', () => {
        const actual = addMonth(1);
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        expect(actual.toISOString()).toBe(d.toISOString());
    });

    it('should add 2 months to a specified datetime', () => {
        const d = new Date('01/13/1982');
        const actual = addMonth(2, d.toISOString());
        d.setMonth(d.getMonth() + 2);
        expect(actual.toISOString()).toBe(d.toISOString());
    });

    it('should get array of all the months and display abbreviated months', () => {
        const actual = getAllMonths('abbr');
        expect(actual.length).toEqual(12);
        expect(actual[1].label).toBe('Feb');
    });

    it('should get array of all the months and display full months', () => {
        const actual = getAllMonths('full');
        expect(actual.length).toEqual(12);
        expect(actual[4].label).toBe('May');
    });

    it('should get array of all the months and display months in numbers', () => {
        const actual = getAllMonths('num');
        expect(actual.length).toEqual(12);
        expect(actual[4].label).toBe('05');
    });
});

describe('timestamp years', () => {
    it('should add 1 year to current datetime', () => {
        const actual = addYear(1);
        const d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        expect(actual.toISOString()).toBe(d.toISOString());
    });

    it('should add 2 year to a specified datetime', () => {
        const d = new Date('11/24/1989');
        const actual = addYear(2, d.toISOString());
        d.setFullYear(d.getFullYear() + 2);
        expect(actual.toISOString()).toBe(d.toISOString());
    });

    it('should return an array with a specified amount of items', () => {
        const actual = getSetAmountOfYears(10);
        const d = new Date();
        const expected = d.getFullYear() - 9;
        expect(actual.length).toEqual(10);
        expect(actual[9].value).toBe(expected);
    });
});

describe('timestamp format date', () => {
    it('should format date based on current datetime', () => {
        const actual = formatDate('yyyy-MM-dd');
        const d = new Date();
        const currentDate = d.getMonth() + 1;
        const formatCurrentDate = currentDate < 10 ? `0${currentDate}` : currentDate;
        const fd = `${d.getFullYear()}-${formatCurrentDate}-${d.getDate()}`;
        expect(actual).toBe(fd);
    });

    it('should format date based on specified datetime', () => {
        const d = new Date('2018-03-13');
        const actual = formatDate('yyyy-MM-dd', d.toISOString());
        const currentDate = d.getMonth() + 1;
        const formatCurrentDate = currentDate < 10 ? `0${currentDate}` : currentDate;
        const fd = `${d.getFullYear()}-${formatCurrentDate}-${d.getDate()}`;
        expect(actual).toBe(fd);
    });

    it('should return the proper unix timestamp', () => {
        const actual = unix();
        const unixInSeconds = Math.floor(Date.now() / 1000);
        expect(actual).toEqual(unixInSeconds);
    });

    it('should add a zero before the inputted number', () => {
        expect(setDoubleDigits(5)).toEqual('05');
    });

    it('should NOT add a zero before the inputted number', () => {
        expect(setDoubleDigits(11)).toEqual('11');
    });
});
