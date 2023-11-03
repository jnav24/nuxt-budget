<script setup lang="ts">
type Props = {
    show: boolean;
    isSuccess: boolean;
};

type Emits = {
    (e: 'update:show', v: boolean): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

watch(
    () => props.show,
    (newValue: boolean) => {
        if (newValue) {
            setTimeout(() => emit('update:show', false), 5000);
        }
    },
);
</script>

<template>
    <p
        class="ease-out-in mr-4 transition duration-150"
        :class="{
            'text-primary': isSuccess,
            'text-danger': !isSuccess,
            'opacity-0': !show,
            'opacity-100': show,
        }"
    >
        {{ isSuccess ? 'Saved!' : 'Error' }}
    </p>
</template>
