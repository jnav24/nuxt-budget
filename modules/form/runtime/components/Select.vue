<script setup lang="ts">
import type { RulesType } from '../types/form';
import useForm from '../composables/useForm';

type Props = {
    handleSelection: (value: string) => void;
    isDisabled?: boolean;
    itemLabel?: string;
    items: SelectItems[];
    itemValue?: string;
    label: string;
    placeholder?: string;
    rules?: RulesType | Array<keyof RulesType>;
    tabIndex?: number;
    validateOnInit?: boolean;
    value: string;
};

type SelectItems = Record<string, string>;

const emit = defineEmits<{ (e: 'update:value', v: string): void }>();
const props = withDefaults(defineProps<Props>(), {
    itemLabel: 'label',
    itemValue: 'value',
    placeholder: 'Select',
    tabIndex: 0,
    validateOnInit: false,
});

const { error, labelId, updateInputValue } = useForm({
    label: props.label,
    validateOnInit: props.validateOnInit,
    value: props.value,
    rules: props.rules,
});

const dropDownItems = ref<HTMLDivElement | null>(null);
const selected = ref(false);

const isValueSelected = computed(
    () => props.value && (Number(props.value) > 0 || props.value.length),
);

const getPlaceholder = computed(() => {
    const text: SelectItems =
        props.items.find((obj: SelectItems) => props.value === obj[props.itemValue]) ?? {};

    if (isValueSelected && text && text[props.itemLabel]) {
        return text[props.itemLabel];
    }

    return props.placeholder;
});

onMounted(() => {});

watch(selected, (value) => {
    if (!value) {
        setTimeout(() => dropDownItems.value?.classList.add('h-0', 'py-0'), 300);
    } else {
        dropDownItems.value?.classList.remove('h-auto', 'py-1');
    }
});

const handleBlur = () => {
    if (!props.isDisabled) {
        selected.value = false;
        // setValue(value); // might not need this line
    }
};

const handleClick = () => {
    if (!props.isDisabled) {
        selected.value = !selected.value;
    }
};

const handleSelection = (value: string) => {
    selected.value = false; // might not need this line
    emit('update:value', value);
    updateInputValue(value);
};
</script>

<template>
    <FormFieldsLabel :error="error" :label="label" :labelId="labelId" />

    <div
        class="relative mt-2 flex transform items-center justify-between rounded-md border border-solid px-2 py-2 outline-none"
        :class="{
            'border-red-600 bg-white text-red-600': error && !isDisabled,
            'dark:bg-dark-main cursor-pointer border-gray-300 bg-white text-gray-600 transition duration-300 hover:border-gray-600 hover:text-gray-700 focus:border-primary dark:border-gray-700':
                !error && !isDisabled,
            'cursor-text border-gray-300 bg-gray-200 text-gray-500 dark:border-gray-600 dark:bg-gray-800':
                isDisabled,
            'z-50': selected,
            'z-0': !selected,
        }"
        :tabindex="tabIndex"
        @blur="handleBlur()"
        @click="handleClick()"
    >
        <span class="flex-1 text-sm text-gray-500">{{ getPlaceholder }}</span>

        <IconsChevronDown
            className="transform transition duration-300 h-6 w-6"
            :class="{ 'rotate-180': selected, 'rotate-0': !selected }"
        />

        <div
            class="dark:bg-dark-main absolute left-0 top-0 max-h-48 w-full transform overflow-y-auto rounded border border-gray-300 bg-white shadow-sm transition duration-300 ease-out"
            :class="{
                'translate-y-12 opacity-100': selected,
                'translate-y-0 opacity-0': !selected,
            }"
            :ref="dropDownItems"
        >
            <div
                class="p-2 text-sm hover:bg-gray-200"
                v-for="(item, index) in items"
                :key="index"
                @click="handleSelection(item[itemValue])"
            >
                {{ item[itemLabel] }}
            </div>
        </div>
    </div>
</template>
