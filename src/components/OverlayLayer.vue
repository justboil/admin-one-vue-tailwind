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
  isActive: Boolean,
})

const emit = defineEmits(['overlay-click'])

const overlayClick = (event) => {
  emit('overlay-click', event)
}
</script>

<template>
  <div
    v-if="isActive"
    :class="[type, zIndex]"
    class="fixed inset-0 flex-col items-center justify-center overflow-hidden"
  >
    <Transition enter-active-class="animate-fade-in">
      <div
        v-show="isActive"
        class="overlay absolute inset-0 bg-linear-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"
        @click="overlayClick"
      />
    </Transition>
    <Transition
      enter-active-class="animate-fade-in"
      enter-from-class="scale-85"
      enter-to-class="scale-100"
      leave-active-class="animate-fade-out"
    >
      <slot />
    </Transition>
  </div>
</template>
