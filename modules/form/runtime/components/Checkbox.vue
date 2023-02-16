<script setup lang="ts">
import { RulesType } from '../types/form';
import useForm from '../composables/useForm';

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
        <BudgetButton checkbox @click="updateValue" v-if="value !== 'checked'">
            <IconsCheck className="w-4 h-4 text-white text-gray-700" />
        </BudgetButton>

        <BudgetButton checkbox color="primary" @click="updateValue" v-if="value === 'checked'">
            <IconsCheck class="w-4 h-4" />
        </BudgetButton>

        <div class="ml-2">
            <BudgetLabel :error="error" :label="label" :labelId="labelId" />
        </div>
    </div>
</template>
