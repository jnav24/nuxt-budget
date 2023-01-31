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

    <Form v-model:valid="valid" @handleSubmit="handleSubmit">
        <FormFieldsInput label="Email" v-model:value="form.email.value" :rules="form.email.rules" />

        <FormFieldsInput
            label="Password"
            password
            v-model:value="form.password.value"
            :rules="form.password.rules"
        />

        <div class="my-4">
            <FormFieldsCheckbox label="Remember Me" v-model:value="form.rememberMe.value" />
        </div>

        <FormFieldsButton block color="secondary" :disabled="!valid">Login</FormFieldsButton>
    </Form>
</template>
