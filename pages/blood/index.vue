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
      <button class="bg-red-500 hover:bg-red-700 rounded-md text-white w-1/2 mx-auto mt-4 p-4 block outline-offset-4">Add new Blood group</button>
      <section class="w-full">
        <BloodList />
      </section>
    </div>
  </NuxtLayout>
</template>
