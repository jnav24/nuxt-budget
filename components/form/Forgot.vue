<script setup lang="ts">
const { forgotPassword } = useGQLAuth();

const alert = reactive({
    display: false,
    message: '',
    type: '',
});

const form = reactive({
    email: {
        value: '',
    },
});

const valid = ref(false);

watchEffect(() => {
    if (alert.display) {
        setTimeout(() => {
            alert.display = false;
            alert.message = '';
            alert.type = '';
        }, 5000);
    }
});

const handleSubmit = async () => {
    const response = await forgotPassword.mutate({
        input: {
            email: form.email.value,
        },
    });

    if (!response?.data.success) {
        alert.display = true;
        alert.message = 'There was an error sending the email';
        alert.type = 'error';
        return;
    }

    alert.display = true;
    alert.message = 'Email was sent successfully';
    alert.type = 'success';
};
</script>

<template>
    <UiTypography variant="h1" className="mb-8 text-center">Forgot Password</UiTypography>

    <p class="mb-8 text-center text-sm text-gray-600">
        Enter your email and we will send you a link with instructions on resetting your password.
    </p>

    <SharedAlert v-if="alert.display" :message="alert.message" :type="alert.type" />

    <BudgetForm v-model:valid="valid" @handleSubmit="handleSubmit">
        <BudgetInput
            v-model:value="form.email.value"
            label="Email"
            :rules="['required', 'email']"
        />
        <BudgetButton block color="secondary" :disabled="!valid" submit> Send Email </BudgetButton>
    </BudgetForm>
</template>
