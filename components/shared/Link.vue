<script setup lang="ts">
type Props = {
    linkTo: string;
    linkType?: string;
};

withDefaults(defineProps<Props>(), { linkType: 'default' });
</script>

<template>
    <NuxtLink
        :class="{
            'mr-6 flex flex-row items-center py-4 text-gray-600 transition duration-300 ease-out hover:text-primary active:text-primary':
                linkType === 'default',
            'ease-out-in mb-1 flex flex-row items-center rounded p-2 text-white transition duration-300 hover:bg-white hover:bg-opacity-25':
                linkType === 'inverted',
        }"
        :exactActiveClass="
            linkType === 'default'
                ? `text-primary`
                : `text-white bg-dark-primary hover:bg-dark-primary hover:bg-opacity-100`
        "
        :to="linkTo"
    >
        <slot />
    </NuxtLink>
</template>
