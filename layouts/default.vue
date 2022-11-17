<template>
    <nav class="flex flex-col sm:flex-row border-b border-slate-300 w-11/12 py-5 justify-between items-center">
        <h3 class="text-red-500 text-sm sm:text-xl outline-offset-8"><NuxtLink to="/">Blood Bank Management System</NuxtLink></h3>
        <ul class="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-2/4 pt-5 sm:pt-0">
            <li><NuxtLink to="/" class="hover:underline outline-offset-8">Home</NuxtLink></li>
            <li><NuxtLink to="/blood" class="hover:underline outline-offset-8">Manage Blood</NuxtLink></li>
            <li><NuxtLink to="/donor" class="hover:underline outline-offset-8">Manage Donor</NuxtLink></li>
            <li><NuxtLink to="/login" class="hover:underline outline-offset-8">Login</NuxtLink></li> | 
            <li><NuxtLink to="/register" class="hover:underline outline-offset-8">Register</NuxtLink></li>
        </ul>
    </nav>
    <slot />
</template>

<style>
.router-link-active,
.router-link-exact-active {
    color: #ef4444;
}
</style>