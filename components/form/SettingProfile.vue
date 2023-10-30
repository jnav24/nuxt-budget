<script setup lang="ts">
const isSuccess = ref(false);
const showAlert = ref(false);
const valid = ref(false);

const form = reactive({
    email: '',
    firstName: '',
    lastName: '',
});

const handleSave = () => {};
</script>

<template>
    <BudgetForm v-model:valid="valid" @handleSubmit="handleSave">
        <BudgetInput
            v-model:value="form.firstName"
            label="First Name"
            :rules="['required', 'min:3']"
        />

        <BudgetInput
            v-model:value="form.lastName"
            label="Last Name"
            :rules="['required', 'min:3']"
        />

        <BudgetInput v-model:value="form.email" label="Email" :rules="['required', 'email']" />
    </BudgetForm>
</template>
