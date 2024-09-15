<template>
  <div
    class="bg-black w-full fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-80"
  >
    <div class="w-full sm:w-1/2 bg-white p-5 opacity- rounded-md relative">
      <p
        class="absolute right-4 bg-red-500 px-2 py-1 text-white font-bold text-xl rounded-md hover:bg-red-700 cursor-pointer"
        @click="emit('close-modal')"
      >
        &times;
      </p>
      <h3 class="text-center font-bold">Add {{props.modalType === "ADD DONOR" ? "Donor" : "Blood Group"}}</h3>
      <form v-if="props.modalType === 'ADD DONOR'" @submit.prevent="addDonor">
        <section class="flex flex-col">
          <label for="name">Name</label>
          <input type="text" id="name" class="border rounded-md p-2" v-model="name" />
        </section>
        <section class="flex flex-col">
          <label for="blood-group">Blood Group</label>
          <select id="blood-group" class="border rounded-md p-2" v-model="bloodGroupId">
            <option value="" disabled>Select Blood Group</option>
            <option v-for="bloodGroup in bloodGroups" :key="bloodGroup.id" :value="bloodGroup.id">
              {{bloodGroup.name}}
            </option>
          </select>
        </section>
        <section class="flex flex-col">
          <label for="gender">Sex</label>
          <select id="gender" class="border rounded-md p-2" v-model="sex">
            <option value="" disabled>Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </section>
        <section class="flex flex-col">
          <label for="email">Email</label>
          <input type="email" id="email" class="border rounded-md p-2" v-model="email" />
        </section>
        <section class="flex flex-col">
          <label for="phone-number">Phone Number</label>
          <input type="tel" id="phone-number" class="border rounded-md p-2" v-model="phoneNumber" />
        </section>
        <button
          type="submit"
          class="bg-red-500 hover:bg-red-700 rounded-md text-white w-1/2 mx-auto mt-4 p-4 block outline-offset-4"
        >
          Add Donor
        </button>
      </form>
      <form v-else @submit.prevent="addBloodGroup">
        <section class="flex flex-col">
          <label for="blood-group-name">Blood Group Name</label>
          <input type="text" id="blood-group-name" class="border rounded-md p-2" v-model="bloodGroupName" />
        </section>
        <section class="flex flex-col">
          <label for="pint-avaliable">Pint Available</label>
          <input type="number" id="pint-avaliable" class="border rounded-md p-2" v-model.number="pintAvailable" />
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
import type { BloodGroup, DonorSex } from '@prisma/client';


const emit = defineEmits<{
  (event: "close-modal"): void;
  (event: "refresh-blood-list"): void;
}>();

type modalTypes = "ADD DONOR" | "ADD BLOOD GROUP";

interface Props {
  modalType: modalTypes
}

const props = withDefaults(defineProps<Props>(), {
  modalType: "ADD DONOR"
});

const name = ref("");
const bloodGroupId = ref("");
const sex = ref<DonorSex | "">("");
const email = ref("");
const phoneNumber = ref("");

const bloodGroups = ref<BloodGroup[]>([]);
const bloodGroupName = ref("");
const pintAvailable = ref(0);

const { useAccessToken } = useAuth();

const addBloodGroup = async () => {
  const { data, error } = await useFetch<{success: boolean, message: string}>("/api/bloodGroup", {
    method: "post",
    body: {
      name: bloodGroupName.value,
      pintAvailable: pintAvailable.value
    },
    headers: {
      authorization: `Bearer ${useAccessToken().value}`
    }
  });

  if (!error.value) {
    alert(data.value?.message);
    emit("refresh-blood-list");
  }
};

const addDonor = async () => {
  try {
    const data = await $fetch<{success: boolean, message: string}>("/api/donor", {
      method: "post",
      body: {
        name: name.value,
        bloodGroupId: bloodGroupId.value,
        sex: sex.value,
        email: email.value,
        phoneNumber: phoneNumber.value
      },
      headers: {
        authorization: `Bearer ${useAccessToken().value}`
      }
    });

    alert(data.message);
  } catch(err) {
    alert("Error occured");
  }
}

onMounted(async () => {
  try {
    if (props.modalType === "ADD DONOR") {
      const data = await $fetch<{success: boolean, bloodGroups: BloodGroup[]}>("/api/bloodGroup", {
        headers: {
          authorization: `Bearer ${useAccessToken().value}`
        }
      });

      bloodGroups.value = data.bloodGroups;
    }
  } catch(err) {
    alert("Error");
  }
});
</script>

<style scoped>
section {
  margin-top: 1rem;
}
</style>
