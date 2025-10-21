<script setup>
defineProps({
  zIndex: {
    type: String,
    default: 'z-50',
  },
  type: {
    type: String,
    default: 'flex',
  },
})

const emit = defineEmits(['overlay-click'])

const overlayClick = (event) => {
  emit('overlay-click', event)
}
</script>

<template>
  <div
    :class="[type, zIndex]"
    class="fixed inset-0 flex-col items-center justify-center overflow-hidden"
  >
    <div
      class="overlay absolute inset-0 animate-overlay-fade-in bg-linear-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"
      @click="overlayClick"
    />

    <slot />
  </div>
</template>
