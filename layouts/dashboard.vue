<script setup lang="ts">
type Props = {
    noTopPadding?: boolean;
};

defineProps<Props>();
</script>

<template>
    <DashboardNav />

    <div class="h-screen overflow-y-auto bg-gray-200 pb-32">
        <div class="container mx-auto" :class="{ 'pt-8': !noTopPadding }">
            <slot />
        </div>
    </div>
</template>
