<script setup lang="ts">
import { ProfileLink } from '~/components/dashboard/Nav.vue';

type Props = {
    icon?: string;
    items: ProfileLink[];
    show: boolean;
};

const emit = defineEmits<{ (e: 'nav-clicked', v: string): void }>();
const props = defineProps<Props>();
const subNav = ref(null);

onMounted(() => (subNav.value as any).classList.add('h-0', 'py-0'));

const handleClick = (value: string) => {
    emit('nav-clicked', value);
};

watch(
    () => props.show,
    (n) => {
        if (!n) {
            setTimeout(() => (subNav.value as any).classList.add('h-0', 'py-0'), 400);
        } else {
            (subNav.value as any).classList.remove('h-auto', 'py-1');
        }
    },
);
</script>

<template>
    <div
        ref="subNav"
        class="absolute right-0 w-32 transform overflow-hidden rounded-lg bg-white shadow-lg transition delay-100 duration-300 ease-out sm:right-auto sm:w-full"
        :class="{
            'translate-y-16 opacity-0': !show,
            'translate-y-2 opacity-100': show,
        }"
    >
        <div v-for="(link, i) in items" :key="i">
            <NuxtLink
                v-if="link.to"
                :to="link.to"
                class="flex flex-row items-center justify-start px-2 py-3 text-sm text-gray-600 hover:bg-gray-200"
            >
                <component v-if="link.icon" :is="link.icon" class="h-4 w-4" />
                <span class="ml-2">{{ link.label }}</span>
            </NuxtLink>

            <div
                v-else
                class="flex cursor-pointer flex-row items-center justify-start px-2 py-3 text-sm text-gray-600 hover:bg-gray-200"
                @click="handleClick(link.action ?? '')"
            >
                <component v-if="link.icon" :is="link.icon" class="h-4 w-4" />
                <span class="ml-2">{{ link.label }}</span>
            </div>
        </div>
    </div>
</template>
