<script setup lang="ts">
import { RulesType } from '~/types/form';

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
        class="border-solid border px-2 py-2 mt-2 rounded-md flex items-center justify-between outline-none transform relative"
        :class="{
            'border-red-600 bg-white text-red-600': error && !isDisabled,
            'border-gray-300 hover:border-gray-600 dark:border-gray-700 bg-white dark:bg-dark-main cursor-pointer text-gray-600 hover:text-gray-700 focus:border-primary transition duration-300':
                !error && !isDisabled,
            'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-text text-gray-500':
                isDisabled,
            'z-50': selected,
            'z-0': !selected,
        }"
        :tabindex="tabIndex"
        @blur="handleBlur()"
        @click="handleClick()"
    >
        <span class="flex-1 text-gray-500 text-sm">{{ getPlaceholder }}</span>

        <IconsChevronDown
            className="transform transition duration-300 h-6 w-6"
            :class="{ 'rotate-180': selected, 'rotate-0': !selected }"
        />

        <div
            class="bg-white dark:bg-dark-main border border-gray-300 shadow-sm absolute transform top-0 left-0 rounded w-full transition ease-out duration-300 max-h-48 overflow-y-auto"
            :class="{
                'translate-y-12 opacity-100': selected,
                'translate-y-0 opacity-0': !selected,
            }"
            :ref="dropDownItems"
        >
            <div
                class="hover:bg-gray-200 p-2 text-sm"
                v-for="(item, index) in items"
                :key="index"
                @click="handleSelection(item[itemValue])"
            >
                {{ item[itemLabel] }}
            </div>
        </div>
    </div>
</template>
