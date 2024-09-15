<template>
  <NuxtLayout>
    <NuxtLink
      to="/blood"
      class="outline-offset-8 inline-block border-red-500 border-2 p-2 rounded-md text-red-500 hover:text-white hover:bg-red-500 mt-4"
      >Back</NuxtLink
    >
    <h3 class="text-center text-2xl">Edit</h3>
    <form
      class="w-1/2 mt-10 mx-auto flex flex-col justify-center items-center gap-5"
      @submit.prevent="updateBloodGroup"
    >
      <section class="flex flex-col w-full">
        <label for="blood-group">Blood Group</label>
        <input class="p-2 border-2 mt-2" id="blood-group" type="text" v-model="bloodGroupName" disabled />
      </section>
      <section class="flex flex-col w-full">
        <label for="stock">Pint available</label>
        <input class="p-2 border-2 mt-2" id="stock" type="number" v-model="pintAvailable" />
      </section>
      <section class="flex flex-col gap-4 w-full">
        <button
          type="submit"
          class="outline-offset-8 bg-green-500 text-white p-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Update
        </button>
        <button
          type="button"
          class="outline-offset-8 bg-red-500 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
          @click="deleteBloodGroup"
        >
          Delete
        </button>
      </section>
    </form>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BloodGroup } from '@prisma/client';

const { useAccessToken } = useAuth();
const { useBloodGroup, setBloodGroup } = useData();


definePageMeta({
  middleware: "auth",
  keepalive: false
});
const route = useRoute();

const bloodGroupName = ref("");
const pintAvailable = ref(0);

const updateBloodGroup = async () => {
  try {
    await $fetch<{success: boolean, bloodGroup: BloodGroup}>(`/api/bloodGroup/${route.params.id}`, {
      method: "put",
      body: {
        name: bloodGroupName.value,
        pintAvailable: pintAvailable.value
      },
      headers: {
        authorization: `Bearer ${useAccessToken().value}`
      }
    });

    alert("Updated successfully");
    navigateTo("/blood");
  } catch(err: any) {
    alert("An Error Occured");
  }
}

const deleteBloodGroup = async () => {
  if (!confirm("Are you sure you want to delete this Blood Group!")) return;

  try {
    const data = await $fetch<{success: boolean, message: string}>(`/api/bloodGroup/${route.params.id}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${useAccessToken().value}`
      }
    });

    alert(data.message);
    navigateTo("/blood");
  } catch(err: any) {
    alert("An Error occured");
  }
}

onMounted(async () => {
  try {
    const data = await $fetch<{success: boolean, bloodGroup: BloodGroup}>(`/api/bloodGroup/${route.params.id}`, {
      headers: {
        authorization: `Bearer ${useAccessToken().value}`
      }
    });
    
    bloodGroupName.value = data.bloodGroup.name;
    pintAvailable.value = data.bloodGroup.pintAvailable;
  } catch (err) {
    alert("Error");
  }
});

</script>
