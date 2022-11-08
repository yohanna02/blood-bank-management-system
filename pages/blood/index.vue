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
      <section class="w-full">
        <BloodList />
      </section>
    </div>
  </NuxtLayout>
</template>
