<script setup>
definePageMeta({
    middleware: ['authenticated'],
});

useHead({ title: 'Dime Budget | Login' });
</script>

<template>
    <NuxtLayout name="auth">
        <FormLogin />
        <template #footer>
            <NuxtLink class="text-gray-700 underline text-sm hover:no-underline" to="/auth/forgot">
                Forgot Password?
            </NuxtLink>
        </template>
    </NuxtLayout>
</template>
