<script setup lang="ts">
const form = reactive({
    email: {
        rules: ['required', 'email'],
        value: '',
    },
});
const valid = ref(false);

const handleSubmit = () => {};
</script>

<template>
    <UiTypography variant="h1" className="mb-8 text-center">Forgot Password</UiTypography>

    <p class="text-sm text-center text-gray-600 mb-8">
        Enter your email and we will send you a link with instructions on resetting your password.
    </p>

    <BudgetForm v-model:valid="valid" @handleSubmit="handleSubmit">
        <BudgetInput label="Email" :rules="form.email.rules" v-model:value="form.email.value" />
        <BudgetButton block color="secondary" :disabled="!valid">Send Email</BudgetButton>
    </BudgetForm>
</template>
