<script setup lang="ts">
const emit = defineEmits<{ (e: 'update:value', value: boolean): void }>();
defineProps<{ value: boolean }>();
</script>

<template>
    <button
        @click="emit('update:value', !value)"
        class="rounded-full w-16 shadow-inner focus:outline-none text-left border transition-all duration-100 ease-in-out"
        :class="{
            'border-success bg-success bg-opacity-50 border-opacity-50': value,
            'border-gray-200 dark:border-gray-400 bg-gray-200 dark:bg-gray-400': !value,
        }"
        style="height: 2.15rem"
        type="button"
    >
        <span
            class="inline-block rounded-full bg-white dark:bg-gray-700 w-8 h-8 transition duration-100 ease-in-out transform"
            :class="{ 'translate-x-9/10': value, 'translate-x-0': !value }"
        />
    </button>
</template>
