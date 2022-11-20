<template>
  <Head>
    <Title>Manage Donors</Title>
  </Head>
  <NuxtLayout>
    <button
      class="bg-red-500 hover:bg-red-700 rounded-md text-white w-1/2 mx-auto mt-4 p-4 block outline-offset-4"
      @click="showModal = !showModal"
    >
      Add Donor
    </button>

    <h2 class="text-center mt-10 text-xl underline">Donor's List</h2>

    <table class="text-center mx-auto mt-5 w-full overflow-scroll">
      <thead>
        <tr>
          <th>Name</th>
          <th>Blood Group</th>
          <th>Sex</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="donor in donors" :key="donor.id">
          <td>{{donor.name}}</td>
          <td>{{donor.bloodGroup.name}}</td>
          <td>{{donor.sex}}</td>
          <td>{{donor.email}}</td>
          <td>{{donor.phoneNumber}}</td>
        </tr>
      </tbody>
    </table>
  </NuxtLayout>
  <Modal v-if="showModal" @close-modal="closeModal"/>
</template>

<script setup lang="ts">
import { DonorI } from '~~/composables/useData';

definePageMeta({
  middleware: "auth"
});
const showModal = ref(false);

const closeModal = async () => {
  showModal.value = !showModal.value;
  await fetchDonors();
}

const { useAccessToken } = useAuth();
const { setDonor, getDonor } = useData();

const donors = computed(() => getDonor());

const fetchDonors = async() => {
  try {
    const data = await $fetch<{success: boolean, donors: DonorI[]}>("/api/donor", {
      headers: {
        authorization: `Bearer ${useAccessToken().value}`
      }
    });

    setDonor(data.donors);
  } catch(err) {
    alert("Error Fetch donors list");
  }
}

onMounted(async() => {
  await fetchDonors();
});

</script>

<style scoped>
th,
td {
  border: 1px solid #000;
  padding: 1rem;
}
</style>
