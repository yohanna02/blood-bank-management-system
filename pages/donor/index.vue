<template>
  <Head>
    <Title>Donor Profile</Title>
  </Head>
  <NuxtLayout name="donor-layout">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold mt-10">Donor Profile</h1>
      <p class="text-lg text-gray-400">
        Blood Group is {{ donorData?.bloodGroup.name }}
      </p>
      <div class="mt-5 mb-3 w-1/2">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-center text-red-600">Error loading profile</div>
        <form v-if="donorData" @submit.prevent="updateProfile">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              type="text"
              id="name"
              v-model="donorData.name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 p-3"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="donorData.email"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              required
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone</label
            >
            <input
              type="tel"
              id="phone"
              v-model="donorData.phoneNumber"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="location"
              class="block text-sm font-medium text-gray-700"
              >Location</label
            >
            <input
              type="text"
              id="location"
              v-model="donorData.location"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="lastDonated"
              class="block text-sm font-medium text-gray-700"
              >Last Donated</label
            >
            <input
              type="date"
              id="lastDonated"
              v-model="donorData.lastDonated"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
              required
            />
          </div>
          
          <button
            type="submit"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Donor } from "@prisma/client";

interface donorType
  extends Omit<Donor, "bloodGroupId" | "password" | "createdAt" | "lastDonated"> {
  lastDonated: string | null;
  bloodGroup: {
    name: string;
  };
}
const loading = ref(false);
const error = ref(false);
const updating = ref(false);

const { useAccessToken } = useAuth();

const donorData = ref<donorType | null>(null);

const updateProfile = async () => {
  try {
    updating.value = true;
    const data = await $fetch("/api/donor/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${useAccessToken().value}`,
        "Content-Type": "application/json",
      },
      body: {
        name: donorData.value?.name,
        email: donorData.value?.email,
        phoneNumber: donorData.value?.phoneNumber,
        location: donorData.value?.location,
        lastDonated: donorData.value?.lastDonated,
      },
    });

    if (data.success) {
      alert("Profile updated successfully");
    } else {
      alert("Error updating profile");
    }
    updating.value = false;
  } catch (error) {
    updating.value = false;
    alert("Error updating profile");
  } 
};

onMounted(async function () {
  try {
    loading.value = true;
    const data = await $fetch("/api/donor/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${useAccessToken().value}`,
      },
    });
  
    donorData.value = data.donor;
    if (donorData.value && data.donor?.lastDonated) {
      donorData.value.lastDonated = new Date(data.donor.lastDonated).toISOString().split("T")[0];
    }
    loading.value = false;
  } catch (e) {
    loading.value = false;
    error.value = true;
  }
});
</script>
