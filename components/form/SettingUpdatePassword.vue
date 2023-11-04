<script setup lang="ts">
const isSuccess = ref(false);
const showAlert = ref(false);
const valid = ref(false);

const form = reactive({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
});

const handleSave = () => {};
</script>

<template>
    <BudgetForm v-model:valid="valid" @handleSubmit="handleSave">
        <BudgetInput
            v-model:value="form.password"
            label="Current Password"
            :rules="['required']"
            password
        />

        <BudgetInput
            v-model:value="form.newPassword"
            label="New Password"
            :rules="['required', 'min:8', 'alpha-numeric']"
            password
        />

        <BudgetInput
            v-model:value="form.confirmNewPassword"
            label="Confirm Password"
            :rules="['required', 'match:new-password']"
            password
        />

        <SharedCardFooter class="flex flex-row items-center justify-end !pr-0">
            <SharedInlineAlert v-model:show="showAlert" :is-success="isSuccess" />
            <BudgetButton color="secondary" :disabled="!valid">Save</BudgetButton>
        </SharedCardFooter>
    </BudgetForm>
</template>
