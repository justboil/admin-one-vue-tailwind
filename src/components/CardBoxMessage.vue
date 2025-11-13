<script setup>
defineProps({
  isSmall: Boolean,
})
</script>

<template>
  <div
    class="text-gray-500 last:mb-0 dark:text-slate-400"
    :class="isSmall ? 'mb-3 text-sm' : 'mb-6'"
  >
    <slot />
  </div>
</template>
