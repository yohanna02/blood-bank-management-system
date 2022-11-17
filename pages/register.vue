<template>
    <Head>
        <Title>Register</Title>
    </Head>
    <NuxtLayout>
        <section v-if="errorDetails">
            <p v-for="(err, index) in errorDetails" :key="index" class="text-center p-3 bg-red-100 my-3 rounded-md">{{ err.message }}</p>
        </section>
        <section v-else-if="errorMessage">
            <p class="text-center p-3 bg-red-100 my-3 rounded-md">{{ errorMessage }}</p>
        </section>
        <div class="flex">
            <div class="w-2/4 sm:block hidden">
                <img src="~/assets/images/pexels-charliehelen-robinson-4531306.jpg" alt="blood image">
            </div>
            <form class="w-full sm:w-2/4 flex flex-col items-center justify-center gap-4" @submit.prevent="registerUser">
                <h3 class="text-red-500 text-center text-2xl">Register</h3>
                <div class="flex flex-col w-4/5">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="p-2 border rounder-md" v-model="email">
                </div>
                <div class="flex flex-col w-4/5">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="p-2 border rounder-md" autocomplete="new-password" v-model="password">
                </div>
                <button 
                    class="w-4/5 bg-red-500 p-2 text-white focus:p-4 rounded-md hover:bg-red-700"
                    :disabled="loading"
                >{{loading ? "Loading..." : "Register"}}</button>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const loading = ref(false);

const router = useRouter();

const { register } = useAuth();
const { getErrorDetails, getErrorMessage } = useErrors();

const errorDetails = computed(() => getErrorDetails());
const errorMessage = computed(() => getErrorMessage());

const registerUser = async () => {
    loading.value = true;
    await register({ email: email.value, password: password.value });
    loading.value = false;

    if (!errorDetails.value && !errorMessage.value)
        router.push({path: "/blood"});
};
</script>