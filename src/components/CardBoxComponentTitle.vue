<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-3 flex items-center justify-between">
    <h1 class="text-2xl">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>
