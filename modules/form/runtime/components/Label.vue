<script setup lang="ts">
defineProps<{ error: string | null; label: string; labelId: string }>();
</script>

<template>
    <label
        :for="labelId"
        :class="{ 'text-gray-600': !error, 'text-red-600': error }"
        class="text-sm"
    >
        {{ label }}
    </label>
</template>
