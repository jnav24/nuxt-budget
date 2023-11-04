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
            label="Current Password"
            :rules="['required', 'min:3']"
        />

        <BudgetInput
            v-model:value="form.lastName"
            label="New Password"
            :rules="['required', 'min:3']"
        />

        <BudgetInput
            v-model:value="form.lastName"
            label="Confirm Password"
            :rules="['required', 'min:3']"
        />

        <SharedCardFooter class="flex flex-row items-center justify-end !pr-0">
            <SharedInlineAlert v-model:show="showAlert" :is-success="isSuccess" />
            <BudgetButton color="secondary" :disabled="!valid">Save</BudgetButton>
        </SharedCardFooter>
    </BudgetForm>
</template>
