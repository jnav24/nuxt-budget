import { describe, expect, it } from 'vitest';
import {
    arrayColumn,
    randomString,
    sortObject,
    toCamelCase,
    toKebabCase,
    toPascalCase,
    toSnakeCase,
    toTitleCase,
} from './common';

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

    it('should set the string to snake_case', () => {
        expect(toSnakeCase('firstName')).toBe('first_name');
        expect(toSnakeCase('homeSweetHome')).toBe('home_sweet_home');
        expect(toSnakeCase('first-name')).toBe('first_name');
        expect(toSnakeCase('home-sweet-home')).toBe('home_sweet_home');
        expect(toSnakeCase('first name')).toBe('first_name');
        expect(toSnakeCase('home sweet home')).toBe('home_sweet_home');
    });

    it('should set the string to kebab-case', () => {
        expect(toKebabCase('firstName')).toBe('first-name');
        expect(toKebabCase('homeSweetHome')).toBe('home-sweet-home');
        expect(toKebabCase('first_name')).toBe('first-name');
        expect(toKebabCase('home_sweet_home')).toBe('home-sweet-home');
        expect(toKebabCase('first name')).toBe('first-name');
        expect(toKebabCase('home sweet home')).toBe('home-sweet-home');
    });

    it('should set the string to Title Case', () => {
        expect(toTitleCase('first_name')).toBe('First Name');
        expect(toTitleCase('first-name')).toBe('First Name');
        expect(toTitleCase('first name')).toBe('First Name');
        expect(toTitleCase('firstName')).toBe('First Name');
    });
});

describe('random string', () => {
    it('should return a string with random characters', () => {
        expect(randomString(8).length).toEqual(8);
    });
});

describe('sort object', () => {
    it('should sort object of strings', () => {
        const original = {
            zuchini: 'zuchini',
            banana: 'banana',
            apple: 'apple',
            orange: 'orange',
        };

        const result = sortObject(original);
        const keys = Object.keys(result);

        expect(keys[0]).toBe('apple');
        expect(keys[1]).toBe('banana');
        expect(keys[2]).toBe('orange');
        expect(keys[3]).toBe('zuchini');
    });
});
