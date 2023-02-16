<script setup lang="ts">
import { RulesType } from '../types/form';
import useForm from '../composables/useForm';

type Props = {
    blended?: boolean;
    readOnly?: boolean;
    handleOnKeyDown?: () => void;
    handleUpdateInput: (value: string) => void;
    label: string;
    placeholder?: boolean;
    rows?: number;
    rules?: RulesType | Array<keyof RulesType>;
    validateOnInit?: boolean;
    value: string;
};

const props = withDefaults(defineProps<Props>(), { validateOnInit: false });
const emit = defineEmits<{ (e: 'update:value', value: string): void }>();

const { error, labelId, updateInputValue } = useForm({
    label: props.label,
    validateOnInit: props.validateOnInit,
    value: props.value,
    rules: props.rules,
});

const handleChange = (e: InputEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    updateInputValue(value);
    emit('update:value', value);
};

const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
        props.handleOnKeyDown?.();
    }
};
</script>

<template>
    <FormFieldsLabel :label="label" :error="error" :labelId="labelId" />

    <div class="relative mt-2">
        <textarea
            :id="labelId"
            :aria-label="labelId"
            class="w-full resize-none border rounded-lg outline-none p-2"
            :class="{
                'bg-gray-200 text-gray-500': readOnly,
                'bg-white': !readOnly,
                'border-gray-300 dark:border-gray-700 focus:border-primary': error,
                'bg-red-600': !error,
            }"
            @change="handleChange($event)"
            @keydown="handleKeyPress($event)"
            :placeholder="placeholder ? label : ''"
            :rows="rows"
            :value="value"
        />
    </div>
</template>
