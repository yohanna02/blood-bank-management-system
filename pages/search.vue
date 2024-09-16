<template>
  <Head>
    <Title>Search Donor</Title>
  </Head>
  <form
    @submit.prevent="searchDonor"
    class="w-full flex justify-center items-center mt-5 flex-col"
  >
    <input
      type="text"
      placeholder="Search donor"
      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
      v-model="bloodGroup"
    />
    <button type="submit" class="mt-5 p-3 text-white bg-red-500 rounded">
      {{ searching ? "Searching..." : "Search" }}
    </button>
  </form>

  <table class="text-center mx-auto mt-5 w-full overflow-scroll">
    <thead>
      <tr>
        <th>Name</th>
        <th>Blood Group</th>
        <th>Sex</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Location</th>
        <th>Last Donation Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="donor in donors" :key="donor.id">
        <td>{{ donor.name }}</td>
        <td>{{ donor.bloodGroup.name }}</td>
        <td>{{ donor.sex }}</td>
        <td>{{ donor.email }}</td>
        <td>{{ donor.phoneNumber }}</td>
        <td>{{ donor.location }}</td>
        <td>
          {{
            donor.lastDonated &&
            new Date(donor.lastDonated).toLocaleDateString()
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
const bloodGroup = ref<string>("");
const donors = ref<any>([]);
const searching = ref<boolean>(false);

async function searchDonor() {
  // Implement search donor logic here
  searching.value = true;
  try {
    const data = await $fetch("/api/donor/search", {
      params: {
        search: bloodGroup.value,
      },
    });

    if (data.success) {
      donors.value = data.donors;
    }
    searching.value = false;
  } catch (error) {
    alert("An error occurred while searching for donor");
    searching.value = false;
  }
}
</script>
<style scoped>
th,
td {
  border: 1px solid #000;
  padding: 1rem;
}
</style>
