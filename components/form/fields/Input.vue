<script setup lang="ts">
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
        rules: string[];
        value: string;
    }>(),
    { onBlur: true },
);

const form = inject('form');

const updateValue = (inputValue: string) => {
    emit('update:value', inputValue);
};

const updateOnBlur = (value: string) => {
    if (props.onBlur) {
        return updateValue(value);
    }

    return null;
};
</script>

<template>
    <div class="relative">
        <FormFieldsLabel v-if="!placeholder" :error="null" labelId="" :label="label" />

        <div class="relative mb-2">
            <div
                class="absolute top-0 left-0 w-10 h-full flex flex-row justify-center items-center"
                v-if="icon"
            >
                {{ icon }}
            </div>

            <input
                :id="labelId"
                class="w-full p-2 mt-2 border rounded outline-none"
                :class="{
                    'border-gray-300 focus:border-primary': !error,
                    'border-red-600': error,
                    'bg-gray-200 dark:bg-gray-700 text-gray-500': readOnly,
                }"
                :type="password ? 'password' : 'text'"
                :value="value"
                :autocomplete="noAutocomplete || password ? 'on' : 'off'"
                @blur="updateOnBlur($event.target.value)"
                @input="updateValue($event.target.value)"
                :aria-labelledby="labelId"
                :readonly="readOnly"
                :placeholder="placeholder ? label : ''"
            />

            <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
        </div>
    </div>
</template>
