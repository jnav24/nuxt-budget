import { describe, it, expect } from 'vitest';
import { addHour } from './timestamp';

describe('timestamp add hour', () => {
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
