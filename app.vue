<template>
  <div class="container mx-auto">
    <NuxtLoadingIndicator color="green" />
    <NuxtPage keepalive />
  </div>
</template>

<script setup lang="ts">
const { initAuth } = useAuth();

onMounted(() => {
    initAuth();
});
</script>
