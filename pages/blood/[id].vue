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
    >
      <section class="flex flex-col w-full">
        <label for="blood-group">Blood Group</label>
        <input class="p-2 border-2 mt-2" id="blood-group" type="text" disabled />
      </section>
      <section class="flex flex-col w-full">
        <label for="stock">Pint available</label>
        <input class="p-2 border-2 mt-2" id="stock" type="number" />
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
        >
          Delete
        </button>
      </section>
    </form>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth"
});
</script>
