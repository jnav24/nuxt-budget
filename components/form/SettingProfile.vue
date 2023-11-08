<script setup lang="ts">
const { userData } = useGQLUser();

const isSuccess = ref(false);
const showAlert = ref(false);
const valid = ref(false);

const form = reactive({
    email: '',
    firstName: '',
    lastName: '',
});

watchEffect(() => {
    if (userData.value) {
        form.firstName = userData.value?.profile.firstName;
        form.lastName = userData.value?.profile.lastName;
        form.email = userData.value?.email;
        // @note this is so strange
        // if I uncomment the line below, the form will NOT populate with saved data
        // If I comment the line below, the form will populate but the submit button will stay disabled
        // valid.value = true;
    }
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

        <BudgetInput
            v-model:value="form.email"
            label="Email"
            :rules="['required', 'email']"
            read-only
        />

        <SharedCardFooter class="flex flex-row items-center justify-end !pr-0">
            <SharedInlineAlert v-model:show="showAlert" :is-success="isSuccess" />
            <BudgetButton color="secondary" :disabled="!valid">Save</BudgetButton>
        </SharedCardFooter>
    </BudgetForm>
</template>
