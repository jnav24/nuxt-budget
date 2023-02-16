<script setup lang="ts">
const form = reactive({
    email: {
        rules: ['required', 'email'],
        value: '',
    },
    password: {
        rules: ['required'],
        value: '',
    },
    rememberMe: {
        rules: [],
        value: '',
    },
});

const valid = ref(false);

const handleSubmit = (e: SubmitEvent) => {
    // do something
    console.log(e);
    console.log(form);
};
</script>

<template>
    <h1 class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8">
        Welcome Back
    </h1>

    <BudgetForm v-model:valid="valid" @handleSubmit="handleSubmit">
        <BudgetInput label="Email" v-model:value="form.email.value" :rules="form.email.rules" />

        <BudgetInput
            label="Password"
            password
            v-model:value="form.password.value"
            :rules="form.password.rules"
        />

        <div class="my-4">
            <BudgetCheckbox label="Remember Me" v-model:value="form.rememberMe.value" />
        </div>

        <BudgetButton block color="secondary" :disabled="!valid">Login</BudgetButton>
    </BudgetForm>
</template>
