<script setup lang="ts">
const props = defineProps<{ valid: boolean }>();
const emit = defineEmits<{ (e: 'handleSubmit', event: SubmitEvent): void }>();

const formElements = reactive({});

const setupForm = (label: string, rules: RulesType | Array<keyof RulesType> = {}) => {
    const labelId = setFormId(label);
    setFormElement(labelId, rules);
    matchFields = {
        ...matchFields,
        ...setMatchFields(labelId, rules),
    };
    return labelId;
};

const validateField = (labelId: string, value: string, initialize = false): string | null => {
    if (!labelId || !labelId.length || !formElements[labelId]) {
        return null;
    }

    const { rules } = formElements[labelId];
    const { error, valid } = validateRules(value, setMatchRules(rules));
    dispatch({
        type: FormElement.UPDATE_FORM_ELEMENT,
        payload: {
            [labelId]: {
                valid,
                value,
            },
        },
    });

    if (initialize) {
        dispatch({
            type: FormElement.UPDATE_FORM_ELEMENT,
            payload: {
                [labelId]: {
                    error,
                },
            },
        });
    }

    if (matchFields[labelId] && formElements[matchFields[labelId]]) {
        validateField(matchFields[labelId], formElements[matchFields[labelId]].value);
    }

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

provide('form', { formElements, valid: props.valid, validateField });
</script>

<template>
    <form @submit.prevent="validateSubmit">
        <slot />
    </form>
</template>
