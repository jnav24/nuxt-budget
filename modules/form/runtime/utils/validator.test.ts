import { describe, it, expect } from 'vitest';
import { validateInput, validateRequest, validateRules } from './validator';

// describe('validate input', () => {});

describe('validate request', () => {
    it('should not throw a validation error', () => {
        const input = { name: 'Bob' };
        expect(() => validateRequest(input, { name: ['required'] })).not.toThrowError(
            /Validation error/,
        );
    });

    it('should throw a validation error', () => {
        const input = { name: '' };
        expect(() => validateRequest(input, { name: ['required'] })).toThrowError(
            /Validation error/,
        );
        expect(() => validateRequest(input, { name: ['required'] })).toThrowErrorMatchingSnapshot(
            'Validation errors',
        );
    });
});

describe('validate rules', () => {
    it('should return valid with no errors if not required', () => {
        const { error, valid } = validateRules('bob', []);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return valid with no errors if not required and no value is given', () => {
        const { error, valid } = validateRules('', []);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return falsy valid with error with no value given for required', () => {
        const { error, valid } = validateRules('', ['required']);
        expect(valid).toBeFalsy();
        expect(error).toBe('Field is required');
    });

    it('should return falsy valid with error with invalid email', () => {
        const { error, valid } = validateRules('some-email', ['email']);
        expect(valid).toBeFalsy();
        expect(error).toBe('Must be a valid email address');
    });

    it('should return valid with no errors on a valid email', () => {
        const { error, valid } = validateRules('some-email@test.com', ['email']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with error when value exceeds max value', () => {
        const { error, valid } = validateRules('Bobby', ['max:3']);
        expect(error).toBe('Field can not exceed 3 characters');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value has max value', () => {
        const { error, valid } = validateRules('Bob', ['max:3']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with error when value does not exceed min value', () => {
        const { error, valid } = validateRules('John', ['min:8']);
        expect(error).toBe('Field should be 8 or more characters');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value has min value', () => {
        const { error, valid } = validateRules('Halle', ['min:3']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value does not equal value', () => {
        const { error, valid } = validateRules('angular', ['eq:3']);
        expect(error).toBe('Field should be 3 characters');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value has equal value', () => {
        const { error, valid } = validateRules('vue', ['eq:3']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value is not alpha numeric', () => {
        const { error, valid } = validateRules('som#thing', ['alpha-numeric']);
        expect(error).toBe('Field must contain letters and numbers');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value is alpha numeric', () => {
        const { error, valid } = validateRules('alphanum3ric', ['alpha-numeric']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });
});
