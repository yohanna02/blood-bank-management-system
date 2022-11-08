<template>
  <div
    class="flex items-center gap-4 w-full rounded-xl hover:bg-slate-200 p-2 mt-4 transition duration-150 ease-in-out border-b-2"
  >
    <div class="w-32">
      <img
        src="~/assets/images/pexels-charliehelen-robinson-4531306.jpg"
        alt="Blood Image"
        class="rounded-xl"
      />
    </div>
    <div class="flex justify-between items-center sm:w-1/3 w-11/12">
      <p class="sm:text-2xl text-lg">A+</p>
      <p class="sm:text-xl text-sm"><b>Pint available:</b> 44</p>
    </div>
    <div class="sm:w-full w-10/12 flex gap-10 justify-end items-center">
        <NuxtLink to="/blood/1" class="outline-offset-8 transition ease-in cursor-pointer">
            <IconsEdit class="w-5 transition duration-1000 ease-in-out hover:w-7" />
        </NuxtLink>
        <button class="outline-offset-8 transition ease-in  cursor-pointer">
            <IconsDelete class="w-5 transition duration-1000 ease-in-out hover:w-7" />
        </button>
    </div>
  </div>
</template>


