<script setup>
definePageMeta({ layout: 'auth' });
useHead({ title: 'Dime Budget | Forgot Password' });

const emailSent = ref(false);
</script>

<template>
    <FormForgot v-if="!emailSent" />
    <FormForgotSuccessful v-if="emailSent" />
    <template #footer>
        <NuxtLink class="text-gray-700 underline text-sm hover:no-underline" to="/auth/login">
            Back to login
        </NuxtLink>
    </template>
</template>
