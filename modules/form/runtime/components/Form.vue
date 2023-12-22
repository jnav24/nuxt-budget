<script setup lang="ts">
import type { FormContextType, FormElementValidationType, RulesType } from '../types/form';
import { FormContext } from '../types/form';
import { validateRules } from '../utils/validator';

const props = defineProps<{ valid: boolean }>();
const emit = defineEmits<{
    (e: 'handleSubmit', event: SubmitEvent): void;
    (e: 'update:valid', event: boolean): void;
}>();

const formElements = reactive({} as Record<string, FormElementValidationType>);

let matchFields: Record<string, string> = {};

const setFormElement = (
    name: string,
    rules: RulesType | Array<keyof RulesType>,
    value = '',
): void => {
    formElements[name] = {
        rules,
        valid: !Object.keys(rules).length,
        error: null,
        value,
    };
};

const setFormId = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');

const getMatchId = (rules: RulesType | Array<keyof RulesType>) => {
    let matchId: string | null = null;

    const keys = Object.keys(rules).filter((str) => str.includes('match'));
    const values = Object.values(rules).filter((str) => str.includes('match'));

    if (keys.length && keys[0].includes(':')) {
        matchId = keys[0].split(':')[1];
    }

    if (values.length && values[0].includes(':')) {
        matchId = values[0].split(':')[1];
    }

    return matchId;
};

const setMatchFields = (labelId: string, rules: RulesType | Array<keyof RulesType>) => {
    const result: Record<string, string> = {};
    const matchId = getMatchId(rules);

    if (matchId) {
        result[matchId] = labelId;
    }

    return result;
};

const setupForm = (label: string, rules: RulesType | Array<keyof RulesType> = {}) => {
    const labelId = setFormId(label);
    setFormElement(labelId, rules);
    matchFields = {
        ...matchFields,
        ...setMatchFields(labelId, rules),
    };
    return labelId;
};

const isFormValid = () => {
    const keys = Object.keys(formElements);
    const valid = Object.values(formElements).filter(
        (elem: { valid: boolean; rules: RulesType | Array<keyof RulesType> }) => elem.valid,
    );
    emit('update:valid', keys.length === valid.length);
};

const setMatchRules = (rules: RulesType | (keyof RulesType)[]) => {
    const valuesIndex = Object.values(rules).findIndex((rule) => rule.includes('match'));

    const matchKey = Object.keys(rules).filter((str) =>
        str.includes('match'),
    ) as (keyof RulesType)[];

    if (matchKey.length) {
        const result: RulesType = { ...rules };
        const formName = matchKey[0].split(':')[1];
        delete result[matchKey[0]];
        return {
            ...result,
            [`match:${formName}|${formElements[formName].value}`]: (rules as RulesType)[
                matchKey[0]
            ],
        };
    }

    if (valuesIndex > -1) {
        const result = { ...rules };
        const formName = (result as Array<keyof RulesType>)[valuesIndex].split(':')[1];
        (result as Array<keyof RulesType>)[
            valuesIndex
        ] = `match:${formName}|${formElements[formName].value}`;
        return result;
    }

    return rules;
};

const validateField = (labelId: string, value: string, initialize = false): string | null => {
    if (!labelId || !labelId.length || !formElements[labelId]) {
        return null;
    }

    const { rules } = formElements[labelId];
    const { error, valid } = validateRules(value, setMatchRules(rules));

    formElements[labelId] = {
        ...formElements[labelId],
        valid,
        value,
    };

    if (initialize) {
        formElements[labelId] = {
            ...formElements[labelId],
            error,
        };
    }

    if (matchFields[labelId] && formElements[matchFields[labelId]]) {
        validateField(matchFields[labelId], formElements[matchFields[labelId]].value);
    }

    isFormValid();
    return error;
};

const validateAllFields = () => {
    for (const [key, obj] of Object.entries(formElements)) {
        validateField(key, obj.value, true);
    }
};

const validateSubmit = (e: SubmitEvent) => {
    if (props.valid) {
        return emit('handleSubmit', e);
    }

    validateAllFields();
};

const resetFields = () => {};

provide<FormContextType>(FormContext, {
    formElements,
    setupForm,
    valid: props.valid,
    validateField,
    validateAllFields,
    resetFields,
});
</script>

<template>
    <form @submit.prevent="validateSubmit"><slot /></form>
</template>
