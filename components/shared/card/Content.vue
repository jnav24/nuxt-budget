<script setup lang="ts">
import { CardProvider } from '~/providers/CardProvider';
const { setCardContent } = inject(CardProvider);
onMounted(() => setCardContent('content'));
</script>

<template>
    <div class="px-4">
        <slot></slot>
    </div>
</template>
