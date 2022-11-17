<template>
  <div class="w-11/12 mx-auto">
    <NuxtLoadingIndicator color="green" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { initAuth } = useAuth();

onMounted(() => {
    initAuth();
});
</script>
