<script setup lang="ts">
interface T extends Record<string, any> {}

type Props<T> = {
    label: string;
    itemLabel?: keyof T;
    items: T[];
    itemValue?: keyof T;
    value: string;
};

const emit = defineEmits<{ (e: 'update:value', v: string): void }>();
const props = withDefaults(defineProps<Props<T>>(), { itemLabel: 'label', itemValue: 'value' });

const sortedList = computed(() => {
    if (props.value.trim().length) {
        return props.items.filter((item) =>
            item[props.itemLabel].toLowerCase().includes(props.value.toLowerCase()),
        );
    }

    return [];
});
</script>

<template>
    <div class="relative z-10">
        <FormFieldsInput :label="label" :value="value" />

        <div
            class="bg-white border border-gray-300 shadow-sm absolute transform top-7 left-0 rounded w-full transition ease-out duration-300 max-h-48 overflow-y-auto"
            :class="{
                'translate-y-12 opacity-100': sortedList.length,
                'translate-y-12 opacity-0': !sortedList.length,
            }"
        >
            <div
                class="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:text-gray-900"
                v-for="item in sortedList"
                :key="item[itemValue]"
                @click="emit('update:value', item[itemValue])"
                role="button"
            >
                {{ item[itemLabel] }}
            </div>
        </div>
    </div>
</template>
