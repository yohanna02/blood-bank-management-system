<template>
  <div
    class="bg-black w-full absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-80"
  >
    <div class="w-full sm:w-1/2 bg-white p-5 opacity- rounded-md relative">
      <p
        class="absolute right-4 bg-red-500 px-2 py-1 text-white font-bold text-xl rounded-md hover:bg-red-700 cursor-pointer"
        @click="emit('close-modal')"
      >
        &times;
      </p>
      <h3 class="text-center font-bold">Add {{props.modalType === "ADD DONOR" ? "Donor" : "Blood Group"}}</h3>
      <form v-if="props.modalType === 'ADD DONOR'">
        <section class="flex flex-col">
          <label for="name">Name</label>
          <input type="text" id="name" class="border rounded-md p-2" />
        </section>
        <section class="flex flex-col">
          <label for="blood-group">Blood Group</label>
          <select id="blood-group" class="border rounded-md p-2">
            <option value="" disabled>Select Blood Group</option>
            <option value="">A+</option>
            <option value="">B+</option>
            <option value="">O+</option>
            <option value="">O-</option>
          </select>
        </section>
        <section class="flex flex-col">
          <label for="gender">Sex</label>
          <select id="gender" class="border rounded-md p-2">
            <option value="" disabled>Select Gender</option>
            <option value="">Male</option>
            <option value="">Female</option>
          </select>
        </section>
        <section class="flex flex-col">
          <label for="email">Email</label>
          <input type="email" id="email" class="border rounded-md p-2" />
        </section>
        <section class="flex flex-col">
          <label for="phone-number">Phone Number</label>
          <input type="tel" id="phone-number" class="border rounded-md p-2" />
        </section>
        <button
          type="submit"
          class="bg-red-500 hover:bg-red-700 rounded-md text-white w-1/2 mx-auto mt-4 p-4 block outline-offset-4"
        >
          Add Donor
        </button>
      </form>
      <form v-else>
        <section class="flex flex-col">
          <label for="blood-group-name">Blood Group Name</label>
          <input type="text" id="blood-group-name" class="border rounded-md p-2" />
        </section>
        <section class="flex flex-col">
          <label for="pint-avaliable">Pint Available</label>
          <input type="number" id="pint-avaliable" class="border rounded-md p-2" />
        </section>
        <button
          type="submit"
          class="bg-red-500 hover:bg-red-700 rounded-md text-white w-1/2 mx-auto mt-4 p-4 block outline-offset-4"
        >
          Add Blood Group
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "close-modal"): void;
}>();

type modalTypes = "ADD DONOR" | "ADD BLOOD GROUP";

interface Props {
  modalType: modalTypes
}

const props = withDefaults(defineProps<Props>(), {
  modalType: "ADD DONOR"
});
</script>

<style scoped>
section {
  margin-top: 1rem;
}
</style>
