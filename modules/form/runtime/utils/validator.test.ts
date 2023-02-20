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

    it('should return invalid with errors when value does not have a uppercase character', () => {
        const { error, valid } = validateRules('no uppercase found', ['upper']);
        expect(error).toBe('Field must contain an uppercase letter');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value does have a uppercase character', () => {
        const { error, valid } = validateRules('Uppercase found', ['upper']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value does not have a lowercase character', () => {
        const { error, valid } = validateRules('NO LOWERCASE FOUND', ['lower']);
        expect(error).toBe('Field must contain a lowercase letter');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value does have a lowercase character', () => {
        const { error, valid } = validateRules('LoWERCASE FOUND', ['lower']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value does not match with password', () => {
        const { error, valid } = validateRules('passwordDoesntMatch', [
            'match:password|somePassw0rd!22',
        ]);
        expect(error).toBe('Field must match with `password`');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value does match with password', () => {
        const { error, valid } = validateRules('somePassw0rd!22', [
            'match:password|somePassw0rd!22',
        ]);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value is not numeric', () => {
        const { error, valid } = validateRules('12b4', ['numeric']);
        expect(error).toBe('Field can only contain numbers');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value is numeric', () => {
        const { error, valid } = validateRules('1234', ['numeric']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value is not a float', () => {
        const { error, valid } = validateRules('1234', ['float:2']);
        expect(error).toBe('Field must be numeric with 2 decimals');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value is a float', () => {
        const { error, valid } = validateRules('1234.56', ['float:2']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value is not greater than 10', () => {
        const { error, valid } = validateRules('9', ['gt:10']);
        expect(error).toBe('Field must be greater than 10');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value is greater than 10', () => {
        const { error, valid } = validateRules('11', ['gt:10']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value is not less than 5', () => {
        const { error, valid } = validateRules('9', ['lt:5']);
        expect(error).toBe('Field must be less than 5');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value is less than 5', () => {
        const { error, valid } = validateRules('1', ['lt:5']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value does not have an integer', () => {
        const { error, valid } = validateRules('no integer', ['has-int']);
        expect(error).toBe('Field must contain a number');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value has a integer', () => {
        const { error, valid } = validateRules('has int 1', ['has-int']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });

    it('should return invalid with errors when value is not a valid USA phone number', () => {
        const { error, valid } = validateRules('(212) 868-1234', ['phone']);
        expect(error).toBe('Field must be a valid phone number');
        expect(valid).toBeFalsy();
    });

    it('should return invalid with errors when value is a valid USA phone number format but with invalid USA code', () => {
        const { error, valid } = validateRules('+02128681234', ['phone']);
        expect(error).toBe('Field must be a valid phone number');
        expect(valid).toBeFalsy();
    });

    it('should return valid with no errors when value is a valid USA phone number', () => {
        const { error, valid } = validateRules('+12128681234', ['phone']);
        expect(error).toBeNull();
        expect(valid).toBeTruthy();
    });
});
