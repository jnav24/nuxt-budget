<script setup lang="ts">
type ButtonColor = 'default' | 'primary' | 'secondary' | 'danger';

const emit = defineEmits<{ (e: ''): void }>();
const props = withDefaults(
    defineProps<{
        block?: boolean;
        checkbox?: boolean;
        color?: ButtonColor;
        disabled?: boolean;
        fab?: boolean;
        filled?: boolean;
        submit?: boolean;
        size?: 'xs' | 'sm' | 'md' | 'lg';
    }>(),
    { color: 'default' },
);

const validateSubmit = () => {};
</script>

<template>
    <button
        class="focus:shadow-outline rounded transition duration-150 focus:outline-none"
        :class="{
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200':
                color === 'default' && !disabled,
            'bg-primary text-white hover:bg-opacity-85 active:bg-dark-primary':
                color === 'primary' && !disabled,
            'bg-secondary text-gray-700 hover:bg-opacity-85 active:bg-dark-secondary':
                color === 'secondary' && !disabled,
            'bg-danger hover:bg-opacity-85 active:bg-dark-danger': color === 'danger' && !disabled,
            'rounded-full p-2': fab,
            'rounded-md p-1': checkbox,
            'rounded-md px-6 py-3 text-sm': !fab && !checkbox,
            'cursor-text bg-gray-300 text-gray-700': disabled,
            'w-full': block,
        }"
        :disabled="disabled"
        @click="validateSubmit"
        :type="submit ? 'submit' : 'button'"
    >
        <span class="flex flex-row items-center justify-center">
            <slot />
        </span>
    </button>
</template>
