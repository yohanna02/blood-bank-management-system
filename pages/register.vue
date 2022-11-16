<template>
    <Head>
        <Title>Register</Title>
    </Head>
    <NuxtLayout>
        <div class="flex">
            <div class="w-2/4 sm:block hidden">
                <img src="~/assets/images/pexels-charliehelen-robinson-4531306.jpg" alt="blood image">
            </div>
            <form class="w-full sm:w-2/4 flex flex-col items-center justify-center gap-4">
                <h3 class="text-red-500 text-center text-2xl">Register</h3>
                <div class="flex flex-col w-4/5">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="p-2 border rounder-md">
                </div>
                <div class="flex flex-col w-4/5">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="p-2 border rounder-md" autocomplete="new-password">
                </div>
                <button class="w-4/5 bg-red-500 p-2 text-white focus:p-4 rounded-md hover:bg-red-700">Register</button>
            </form>
        </div>
    </NuxtLayout>
</template>