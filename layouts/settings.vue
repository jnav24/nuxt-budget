<script setup lang="ts">
type Props = {
    description: string;
    title: string;
};

defineProps<Props>();
</script>

<template>
    <section class="mb-8 flex flex-row justify-between border-b-2 pb-8 align-top">
        <div class="w-1/3">
            <h3 class="font-header text-xl text-gray-800">{{ title }}</h3>
            <p class="text-sm text-gray-600">{{ description }}</p>
        </div>
        <div class="w-1/2">
            <SharedCardContainer class="shadow-md" style="margin-top: 0">
                <slot></slot>
            </SharedCardContainer>
        </div>
    </section>
</template>
