export const FormContext = Symbol('FormContext');

export type RulesOptions = {
    message?: string;
    pattern?: string;
};

export type RulesType = {
    'alpha-numeric'?: RulesOptions;
    email?: RulesOptions;
    [key: `eq:${number}`]: RulesOptions;
    [key: `float:${number}`]: RulesOptions;
    [key: `gt:${number}`]: RulesOptions;
    [key: `lt:${number}`]: RulesOptions;
    'has-int'?: RulesOptions;
    lower?: RulesOptions;
    [key: `match:${string}`]: RulesOptions;
    [key: `max:${number}`]: RulesOptions;
    [key: `min:${number}`]: RulesOptions;
    numeric?: RulesOptions;
    phone?: RulesOptions;
    required?: RulesOptions;
    upper?: RulesOptions;
};

export type FormElementValidationType = {
    valid: boolean;
    rules: RulesType | Array<keyof RulesType>;
    error: string | null;
    value: string;
};

type FormElementsType = Record<string, FormElementValidationType>;

export type FormContextType = {
    formElements: FormElementsType;
    setupForm: (label: string, rules: any) => string;
    validateField: (labelId: string, value: string, initialize?: boolean) => string | null;
    valid: boolean;
    validateAllFields: () => void;
    resetFields: () => void;
};
