<script setup lang="ts">
const { logout } = useGQLAuth();
const router = useRouter();

const logUserOut = async () => {
    const response = await logout.mutate();

    if (response?.data) {
        router.push({ path: '/auth/login' });
    }
};
</script>

<template>
    <NuxtLayout name="dashboard">
        <h1>Dashboard</h1>
        <button @click="logUserOut()" type="button">Logout</button>
    </NuxtLayout>
</template>
