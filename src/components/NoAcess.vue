<script setup>

  const props = defineProps({
    label: String,
  });
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="text-center p-4">
      You have no access to {{ props.label }}
    </div>
  </div>
</template>

