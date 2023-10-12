<script setup lang="ts">
import { RulesType } from '../types/form';
import useForm from '../composables/useForm';

const emit = defineEmits<{ (e: 'update:value', value: string): void }>();
const props = withDefaults(
    defineProps<{
        icon?: any;
        label: string;
        noAutocomplete?: boolean;
        onBlur?: boolean;
        password?: boolean;
        placeholder?: boolean;
        readOnly?: boolean;
        rules?: RulesType | Array<keyof RulesType>;
        validateOnInit?: boolean;
        value: string;
    }>(),
    { onBlur: true, validateOnInit: false },
);

const { error, labelId, updateInputValue } = useForm({
    label: props.label,
    validateOnInit: props.validateOnInit,
    value: props.value,
    rules: props.rules,
});

const updateValue = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    updateInputValue(value);
    emit('update:value', value);
};

const updateOnBlur = (event: FocusEvent) => {
    if (props.onBlur) {
        return updateValue(event);
    }

    return null;
};
</script>

<template>
    <div class="relative">
        <BudgetLabel v-if="!placeholder" :error="error" labelId="labelId" :label="label" />

        <div class="relative mb-2">
            <div
                class="absolute left-0 top-0 flex h-full w-10 flex-row items-center justify-center"
                v-if="icon"
            >
                {{ icon }}
            </div>

            <input
                :id="labelId"
                class="mt-2 w-full rounded border p-2 outline-none"
                :class="{
                    'border-gray-300 focus:border-primary': !error,
                    'border-red-600': error,
                    'bg-gray-200 text-gray-500 dark:bg-gray-700': readOnly,
                }"
                :type="password ? 'password' : 'text'"
                :value="value"
                :autocomplete="noAutocomplete || password ? 'on' : 'off'"
                @blur="updateOnBlur($event)"
                @input="updateValue($event)"
                :aria-labelledby="labelId"
                :readonly="readOnly"
                :placeholder="placeholder ? label : ''"
            />

            <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
        </div>
    </div>
</template>
