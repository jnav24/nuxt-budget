<script setup lang="ts">
const { login } = useGQLAuth();
const router = useRouter();

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

const isLoading = ref(false);
const valid = ref(false);
const error: Ref<string | null> = ref(null);

const handleSubmit = async (e: SubmitEvent) => {
    isLoading.value = true;

    try {
        const response = await login.mutate({
            input: {
                email: form.email.value,
                password: form.password.value,
                rememberMe: false,
            },
        });

        if (response?.data) {
            // @todo get the redirect from the response; see how I am doing it in chatty chat
            router.push({ path: '/dashboard' });
        }
    } catch (err) {
        error.value = (err as any).message || 'Something unexpected has occurred';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <h1 class="mb-8 text-center font-header text-2xl text-gray-800 sm:text-gray-600">
        Welcome Back
    </h1>

    <SharedAlert v-if="error" :message="error" type="error" />

    <BudgetForm v-model:valid="valid" @handleSubmit="handleSubmit">
        <BudgetInput v-model:value="form.email.value" label="Email" :rules="form.email.rules" />

        <BudgetInput
            v-model:value="form.password.value"
            label="Password"
            password
            :rules="form.password.rules"
        />

        <div class="my-4">
            <BudgetCheckbox v-model:value="form.rememberMe.value" label="Remember Me" />
        </div>

        <BudgetButton block color="secondary" :disabled="isLoading || !valid" submit>
            <IconsLoader v-if="isLoading" className="animate-spin text-gray-500 w-5 h-5" />
            <span v-if="!isLoading">Login</span>
        </BudgetButton>
    </BudgetForm>
</template>
