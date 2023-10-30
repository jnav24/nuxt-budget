<script setup lang="ts">
import { CardProvider } from '~/providers/CardProvider';

type Props = {
    color?: string;
};

withDefaults(defineProps<Props>(), { color: 'white' });

const cardContents: Record<string, boolean> = reactive({
    content: false,
    footer: false,
    header: false,
});

const setCardContent = (type: string) => {
    if ({}.propertyIsEnumerable.call(cardContents, type)) {
        cardContents[type] = true;
    }
};

provide(CardProvider, { setCardContent });
</script>

<template>
    <div
        class="my-2 rounded-md shadow-sm transition duration-150 sm:my-4"
        :class="{
            [`bg-${color}`]: true,
            'px-4': !cardContents.content,
            'pb-4': !cardContents.footer,
            'pt-4': !cardContents.header,
        }"
    >
        <!-- transform hover:scale-105 hover:text-white -->
        <slot></slot>
    </div>
</template>
