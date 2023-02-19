import { describe, it, expect } from 'vitest';
import { toTitleCase } from './functions';

describe('functions', () => {
    it('should convert kebab case to title case', () => {
        const actual = toTitleCase('kebab-case');
        expect(actual).toBe('Kebab Case');
    });

    it('should convert snake case to title case', () => {
        const actual = toTitleCase('snake_case', '_');
        expect(actual).toBe('Snake Case');
    });

    it('should capitalize single word', () => {
        const actual = toTitleCase('case');
        expect(actual).toBe('Case');
    });

    it('should return empty', () => {
        const actual = toTitleCase('');
        expect(actual).empty;
        expect(actual.length).toEqual(0);
    });
});
