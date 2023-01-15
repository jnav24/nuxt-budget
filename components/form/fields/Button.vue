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
        class="focus:outline-none focus:shadow-outline transition duration-150 rounded"
        :class="{
            'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-gray-300 border':
                color === 'default' && !disabled,
            'bg-primary hover:bg-opacity-85 active:bg-dark-primary text-white':
                color === 'primary' && !disabled,
            'bg-secondary hover:bg-opacity-85 active:bg-dark-secondary text-gray-700':
                color === 'secondary' && !disabled,
            'bg-danger hover:bg-opacity-85 active:bg-dark-danger': color === 'danger' && !disabled,
            'rounded-full p-2 mr-2': fab,
            'p-1 rounded-md': checkbox,
            'py-3 px-6 rounded-md text-sm mr-2': !fab && !checkbox,
            'bg-gray-300 text-gray-700 cursor-text': disabled,
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
