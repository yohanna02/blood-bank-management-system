<template>
  <Head>
    <Title>Manage Blood</Title>
  </Head>
  <NuxtLayout>
    <div class="flex flex-col items-center">
      <section class="w-1/2 flex justify-center border-b-2 pb-4">
        <input
          type="search"
          placeholder="Search Blood Bank"
          class="p-2 mt-10 border w-1/2 rounded-md"
        />
      </section>
      <button
        class="bg-red-500 hover:bg-red-700 rounded-md text-white w-1/2 mx-auto mt-4 p-4 block outline-offset-4"
        @click="showModal = !showModal"
      >
        Add new Blood group
      </button>
      <section class="w-full">
        <BloodList 
          v-for="bloodGroup in bloodGroupList" 
          :key="bloodGroup.id" 
          :blood-group-name="bloodGroup.name"
          :pint-available="bloodGroup.pintAvailable"
        />
      </section>
    </div>
  </NuxtLayout>
  <Modal
    v-if="showModal"
    @close-modal="showModal = !showModal"
    @refresh-blood-list="refreshBloodList"
    modal-type="ADD BLOOD GROUP"
  />
</template>

<script setup lang="ts">
import { BloodGroupI } from "~~/interface/Blood";
interface BloodGroupI_E extends BloodGroupI {
  id: string;
};

definePageMeta({
  middleware: "auth"
});

const showModal = ref(false);

const bloodGroupList = ref<BloodGroupI_E[]>([]);

const { useAccessToken, logout } = useAuth();

interface ResponseI {
  success: boolean;
  bloodGroups: BloodGroupI_E[];
}

let refreshBloodList: any = null;

onMounted(async() => {
  const { refresh } = await useFetch<ResponseI>("/api/bloodGroup", {
    method: "get",
    headers: {
      authorization: `Bearer ${useAccessToken().value}`
    },
    onResponse({request, response, options}) {
      bloodGroupList.value = response._data.bloodGroups;
    },
    onResponseError({request, response, options}) {
      if (response.status === 401) {
        logout();
      }
      else {
        alert("Error");
      }
    }
  });
  
  refreshBloodList = () => {
    refresh();
  }
});
// else {
//   if (data.value?.bloodGroups)
//     bloodGroupList.value = data.value?.bloodGroups;
// }

</script>
