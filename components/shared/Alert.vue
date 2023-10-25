<script setup lang="ts">
type Props = { message: string; title: string | null; type: 'error' | 'success' | 'warn' | 'info' };
withDefaults(defineProps<Props>(), { title: null });
</script>

<template>
    <div
        class="mb-4 flex items-start justify-start rounded border px-4 py-3"
        :class="{
            'border-red-600 bg-red-200 text-red-700 dark:bg-red-600 dark:text-white':
                type === 'error',
            'border-blue=600 bg-blue-200': type === 'info',
            'border-green-400 bg-green-300 text-green-800 dark:bg-green-600 dark:text-white':
                type === 'success',
            'border-yellow-500 bg-yellow-200': type === 'warn',
        }"
        role="alert"
    >
        <div class="ml-2 flex flex-col">
            <span v-if="title" class="font-bold">{{ title }}</span>
            <span>{{ message }}</span>
        </div>
    </div>
</template>
