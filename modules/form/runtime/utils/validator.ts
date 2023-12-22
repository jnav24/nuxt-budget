import type { RulesType } from '../types/form';
import { toTitleCase } from './functions';
import { ValidationException } from './exceptions';

class BudgetError extends Error {}

function validateEmail(email: string): boolean {
    return /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(
        email,
    );
}

function validateRequired(val: string | number): boolean {
    return !!val.toString().trim();
}

export function validateUpper(value: string): boolean {
    return /[A-Z]/.test(value);
}

export function validateLower(value: string): boolean {
    return /[a-z]/.test(value);
}

export function validateAlphaNumeric(value: string): boolean {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
}

export function validateSpecialCharacters(value: string): boolean {
    return /[!@#$%^&*)(+=._-]+/g.test(value);
}

/**
 *
 * @param matchingValue; has the form rule `match`
 * @param value; regular form rule that `matchingValue` is getting matched to
 */
export function validateMatch(matchingValue: string, value: string): boolean {
    if (value.includes('|')) {
        return matchingValue === value.split('|')[1];
    }

    return matchingValue === value;
}

export function validateNumeric(value: string): boolean {
    return /^\d+$/.test(value);
}

export function validateHasInt(value: string): boolean {
    return /[0-9]+/g.test(value);
}

function validateFunctionParam(fun: string, num: string) {
    if (!validateNumeric(num)) {
        throw new BudgetError(`The param for the validation rule, ${fun}, must be numeric`);
    }
}

function validateMax(value: string, characters: string) {
    validateFunctionParam('max', characters);
    return value.length <= Number(characters);
}

export function validateMin(value: string, characters: string) {
    validateFunctionParam('min', characters);
    return value.length >= Number(characters);
}

function validateFloat(value: string, num: string) {
    validateFunctionParam('float', num);
    const regex = '^\\d+(\\.\\d{' + num + '})$';
    return new RegExp(regex).test(value);
}

function validateGt(value: string, num: string) {
    validateFunctionParam('gt', num);
    return Number(value) > Number(num);
}

function validateLt(value: string, num: string) {
    validateFunctionParam('lt', num);
    return Number(value) < Number(num);
}

function validateEq(value: string, num: string) {
    validateFunctionParam('eq', num);
    return value.length === Number(num);
}

function validatePhone(value: string) {
    const regex = '^\\+1(\\d{10})$';
    return new RegExp(regex).test(value);
}

const validators = {
    validateAlphaNumeric,
    validateEmail,
    validateEq,
    validateFloat,
    validateGt,
    validateHasInt,
    validateLt,
    validateLower,
    validateMatch,
    validateMax,
    validateMin,
    validatePhone,
    validateRequired,
    validateSpecialCharacters,
    validateUpper,
};

const defaultErrorMessages: Record<string, string> = {
    'alpha-numeric': 'Field must contain letters and numbers',
    email: 'Field must be a valid email address',
    eq: 'Field should be ##REPLACE## characters',
    float: 'Field must be numeric with ##REPLACE## decimals',
    gt: 'Field must be greater than ##REPLACE##',
    'has-int': 'Field must contain a number',
    lower: 'Field must contain a lowercase letter',
    lt: 'Field must be less than ##REPLACE##',
    match: 'Field must match with `##REPLACE##`',
    max: 'Field can not exceed ##REPLACE## characters',
    min: 'Field should be ##REPLACE## or more characters',
    numeric: 'Field can only contain numbers',
    phone: 'Field must be a valid phone number',
    required: 'Field is required',
    upper: 'Field must contain an uppercase letter',
    // @todo add in
    // @todo add uuid
};

const setMessage = (message: string, rep: string) => {
    if (rep.includes('|')) {
        return message.replace('##REPLACE##', rep.split('|')[0]);
    }

    return message.replace('##REPLACE##', rep);
};

const getTypeAndParam = (type: string): string[] => type.split(':');

const validateInput = (type: string, value: string): boolean => {
    const [validationType, validationParam] = getTypeAndParam(type);
    const func = `validate${toTitleCase(validationType).replace(/\s+/, '')}`;

    try {
        if (!(validators as any)[func]) {
            throw new Error(`Function for type '${validationType}', does not exist`);
        }

        return validationParam
            ? (validators as any)[func](value, validationParam)
            : (validators as any)[func](value);
    } catch (err) {
        throw (err as any).message;
    }
};

const validateRules = (
    inputValue: string,
    rules: RulesType | Array<keyof RulesType>,
): { error: null | string; valid: boolean } => {
    let tempValid = true;
    let error = null;

    if (
        !Object.values(rules).includes('required') &&
        !Object.keys(rules).includes('required') &&
        (!inputValue || !inputValue.toString().trim().length)
    ) {
        return { error, valid: tempValid };
    }

    for (const [key, value] of Object.entries(rules)) {
        const isNumeric = validateNumeric(key);
        const type = isNumeric ? value : key;
        const [validationType, validationParams] = getTypeAndParam(type);
        const message = isNumeric
            ? setMessage(
                  defaultErrorMessages[validationType] ?? defaultErrorMessages.required,
                  validationParams ?? '',
              )
            : value;
        const isValid = validateInput(type, inputValue);

        if (!tempValid) {
            continue;
        }

        if (!isValid && tempValid) {
            error = message;
            tempValid = false;
            continue;
        }

        error = null;
        tempValid = true;
    }

    return {
        error,
        valid: tempValid,
    };
};

const validateRequest = <InputObject, RuleObject extends keyof InputObject>(
    request: InputObject,
    rulesObject: Record<RuleObject, Array<keyof RulesType> | RulesType>,
) => {
    const errors = {} as Record<RuleObject, string>;

    (Object.keys(rulesObject) as RuleObject[]).forEach((field) => {
        const { error, valid } = validateRules(
            (request?.[field] ?? '') as string,
            rulesObject[field],
        );
        if (!valid) {
            errors[field] = error as string;
        }
    });

    if (Object.keys(errors).length) {
        // Nuxt calls this regardless if this only gets called on the server then throws an error
        throw new ValidationException('Validation error', errors);
    }
};

export { validateInput, validateRequest, validateRules };
