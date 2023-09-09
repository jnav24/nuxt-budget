import { describe, expect, it } from 'vitest';
import { arrayColumn, toCamelCase, toPascalCase } from './common';

describe('array column', () => {
    const contacts = [
        { first_name: 'Clark', last_name: 'Kent' },
        { first_name: 'Lois', last_name: 'Lane' },
        { first_name: 'Lana', last_name: 'Lang' },
    ];

    it('should return an array of first names', () => {
        const names = arrayColumn('first_name', contacts);
        expect(names[0]).toEqual('Clark');
        expect(names[1]).toEqual('Lois');
        expect(names[2]).toEqual('Lana');
    });
});

describe('convert casing', () => {
    it('should set the string to camelcase', () => {
        expect(toCamelCase('first_name')).toBe('firstName');
        expect(toCamelCase('first-name')).toBe('firstName');
        expect(toCamelCase('first name')).toBe('firstName');
    });

    it('should set the string to PascalCase', () => {
        expect(toPascalCase('first_name')).toBe('FirstName');
        expect(toPascalCase('first-name')).toBe('FirstName');
        expect(toPascalCase('first name')).toBe('FirstName');
    });
});
