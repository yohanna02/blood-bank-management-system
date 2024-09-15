<template>
  <Head>
    <Title>Donor Register</Title>
  </Head>
  <NuxtLayout name="donor-layout">
    <section v-if="errorDetails">
      <p
        v-for="(err, index) in errorDetails"
        :key="index"
        class="text-center p-3 bg-red-100 my-3 rounded-md"
      >
        {{ err.message }}
      </p>
    </section>
    <section v-else-if="errorMessage">
      <p class="text-center p-3 bg-red-100 my-3 rounded-md">
        {{ errorMessage }}
      </p>
    </section>
    <div class="flex">
      <div class="w-2/4 sm:block hidden">
        <img
          src="~/assets/images/pexels-charliehelen-robinson-4531306.jpg"
          alt="blood image"
        />
      </div>
      <form
        class="w-full sm:w-2/4 flex flex-col items-center justify-center gap-4 mb-5"
        @submit.prevent="registerUser"
      >
        <h3 class="text-red-500 text-center text-2xl">Donor Register</h3>
        <div class="flex flex-col w-4/5">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            class="p-2 border rounder-md"
            v-model="name"
          />
        </div>
        <div class="flex flex-col w-4/5">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="p-2 border rounder-md"
            v-model="email"
          />
        </div>
        <div class="flex flex-col w-4/5">
          <label for="phone-no">Phone Number</label>
          <input
            type="tel"
            id="phone-no"
            class="p-2 border rounder-md"
            v-model="phoneNo"
          />
        </div>
        <div class="flex flex-col w-4/5">
          <label for="blood-group">Blood Group</label>
          <select
            id="blood-group"
            class="p-2 border rounder-md"
            v-model="selectedBloodGroup"
          >
            <option disabled value="">Select Bloodgroup</option>
            <option
              v-for="blood in bloodGroup"
              :key="blood.id"
              :value="blood.id"
            >
              {{ blood.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col w-4/5">
          <label for="gender">Gender</label>
          <select id="gender" class="p-2 border rounder-md" v-model="gender">
            <option value="" disabled>Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div class="flex flex-col w-4/5">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            class="p-2 border rounder-md"
            v-model="location"
          />
        </div>
        <div class="flex flex-col w-4/5">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            class="p-2 border rounder-md"
            autocomplete="new-password"
            v-model="password"
          />
        </div>
        <button
          class="w-4/5 bg-red-500 p-2 text-white focus:p-4 rounded-md hover:bg-red-700"
          :disabled="loading"
        >
          {{ loading ? "Loading..." : "Register" }}
        </button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { DonorSex } from "@prisma/client";

const bloodGroup = ref<{ id: string; name: string }[]>([]);

const name = ref("");
const selectedBloodGroup = ref("");
const gender = ref<DonorSex>("MALE");
const location = ref("");
const email = ref("");
const phoneNo = ref("");
const password = ref("");
const loading = ref(false);

const { register } = useAuth();
const { getErrorDetails, getErrorMessage } = useErrors();

const errorDetails = computed(() => getErrorDetails());
const errorMessage = computed(() => getErrorMessage());

const registerUser = async () => {
  loading.value = true;
  await register(
    {
      email: email.value,
      password: password.value,
      bloodGroupId: selectedBloodGroup.value,
      location: location.value,
      name: name.value,
      phoneNumber: phoneNo.value,
      sex: gender.value,
    },
    "donor"
  );
  loading.value = false;

  if (!errorDetails.value && !errorMessage.value) navigateTo("/donor");
};

onMounted(async function () {
  const data = await $fetch("/api/bloodGroup", {
    method: "GET",
  });
  const r = data.bloodGroups.map(function (blood) {
    return {
      id: blood.id,
      name: blood.name,
    };
  });

  if (r) {
    bloodGroup.value = r;
  }
});
</script>
