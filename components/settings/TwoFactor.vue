<script setup lang="ts">
const toggleState = ref(false);
</script>

<template>
    <NuxtLayout
        name="settings"
        title="Two Factor Authentication"
        description="Add additional security to your account by using two factor authentication"
    >
        <div class="mb-2 flex flex-row items-center justify-between text-gray-700">
            <span>{{ toggleState ? 'Enabled' : 'Disabled' }}</span>
            <BudgetToggle v-model:value="toggleState" />
        </div>
    </NuxtLayout>
</template>
