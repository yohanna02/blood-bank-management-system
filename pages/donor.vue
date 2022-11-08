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
        <tr>
          <td>Yohanna Philip</td>
          <td>A+</td>
          <td>Male</td>
          <td>yohanaabana02@gmail.com</td>
          <td>09022107944</td>
        </tr>
        <tr>
          <td>Yohanna Philip</td>
          <td>A+</td>
          <td>Male</td>
          <td>yohanaabana02@gmail.com</td>
          <td>09022107944</td>
        </tr>
      </tbody>
    </table>
  </NuxtLayout>
  <Modal v-if="showModal" @close-modal="showModal = !showModal"/>
</template>

<script setup lang="ts">
const showModal = ref(false);
</script>

<style scoped>
th,
td {
  border: 1px solid #000;
  padding: 1rem;
}
</style>
