<script setup>
definePageMeta({ layout: 'auth' });
useHead({ title: 'Dime Budget | Forgot Password' });

const emailSent = ref(false);
</script>

<template>
    <FormForgot v-if="!emailSent" />
    <FormForgotSuccessful v-if="emailSent" />
</template>
