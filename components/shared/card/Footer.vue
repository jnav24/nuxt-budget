<script setup lang="ts">
import { CardProvider } from '~/providers/CardProvider';
const { setCardContent } = inject(CardProvider);
onMounted(() => setCardContent('footer'));
</script>

<template>
    <div class="px-4 pb-4">
        <slot></slot>
    </div>
</template>
