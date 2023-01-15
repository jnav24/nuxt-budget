<script setup lang="ts">
import { RulesType } from '~/types/form';

const props = defineProps<{
    value: string;
    label: string;
    rules?: RulesType | Array<keyof RulesType>;
    validateOnInit?: boolean;
}>();

const emit = defineEmits<{ (e: 'update:value', value: string): void }>();

const { error, labelId, updateInputValue } = useForm({
    label: props.label,
    validateOnInit: !!props.validateOnInit,
    value: props.value,
    rules: props.rules,
});

const updateValue = () => {
    const value = props.value === 'checked' ? '' : 'checked';
    updateInputValue(value);
    emit('update:value', value);
};
</script>

<template>
    <div class="flex flex-row items-center">
        <FormFieldsButton checkbox @click="updateValue" v-if="value !== 'checked'">
            <IconsCheck className="w-4 h-4 text-white text-gray-700" />
        </FormFieldsButton>

        <FormFieldsButton checkbox color="primary" @click="updateValue" v-if="value === 'checked'">
            <IconsCheck class="w-4 h-4" />
        </FormFieldsButton>

        <div class="ml-2">
            <FormFieldsLabel :error="error" :label="label" :labelId="labelId" />
        </div>
    </div>
</template>
