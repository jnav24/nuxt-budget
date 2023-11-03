<script setup lang="ts">
import { CardProvider } from '~/providers/CardProvider';
const { setCardContent } = inject(CardProvider);
onMounted(() => setCardContent('header'));
</script>

<template>
    <div class="px-4 py-4">
        <slot></slot>
    </div>
</template>
