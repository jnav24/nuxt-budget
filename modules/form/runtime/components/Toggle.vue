<script setup lang="ts">
const emit = defineEmits<{ (e: 'update:value', value: boolean): void }>();
defineProps<{ value: boolean }>();
</script>

<template>
    <button
        class="w-16 rounded-full border text-left shadow-inner transition-all duration-100 ease-in-out focus:outline-none"
        :class="{
            'border-success bg-success border-opacity-50 bg-opacity-50': value,
            'border-gray-200 bg-gray-200 dark:border-gray-400 dark:bg-gray-400': !value,
        }"
        style="height: 2.15rem"
        type="button"
        @click="emit('update:value', !value)"
    >
        <span
            class="inline-block h-8 w-8 transform rounded-full bg-white transition duration-100 ease-in-out dark:bg-gray-700"
            :class="{ 'translate-x-9/10': value, 'translate-x-0': !value }"
        />
    </button>
</template>
