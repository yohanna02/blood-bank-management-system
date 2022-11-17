<template>
    <nav class="flex flex-col sm:flex-row border-b border-slate-300 py-5 justify-between items-center">
        <h3 class="text-red-500 text-sm sm:text-xl outline-offset-8"><NuxtLink to="/">Blood Bank Management System</NuxtLink></h3>
        <ul class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-3/4 pt-5 sm:pt-0">
            <li><NuxtLink to="/" class="hover:underline outline-offset-8">Home</NuxtLink></li>
            <li><NuxtLink to="/blood" class="hover:underline outline-offset-8">Manage Blood</NuxtLink></li>
            <li><NuxtLink to="/donor" class="hover:underline outline-offset-8">Manage Donor</NuxtLink></li>
            <li v-if="!user"><NuxtLink to="/login" class="hover:underline outline-offset-8">Login</NuxtLink></li> | 
            <li v-if="!user"><NuxtLink to="/register" class="hover:underline outline-offset-8">Register</NuxtLink></li>
            <li>{{ user }}</li>
            <button v-if="user" @click="logoutUser" class="bg-red-500 p-2 text-white rounded-md">Logout</button>
        </ul>
    </nav>
    <slot />
</template>

<script setup lang="ts">
const { useUser, logout } = useAuth();
const user = useUser();

const logoutUser = async () => {
    await logout();
}

</script>

<style>
.router-link-active,
.router-link-exact-active {
    color: #ef4444;
}
</style>