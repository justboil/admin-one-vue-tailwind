<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

defineProps({
  zIndex: {
    type: String,
    default: 'z-50'
  }
})

const emit = defineEmits(['overlay-click'])

const overlayClick = event => {
  emit('overlay-click', event)
}

const mainStore = useMainStore()

const overlayStyle = computed(() => mainStore.overlayStyle)
</script>

<template>
  <div
    class="flex items-center flex-col justify-center overflow-hidden fixed inset-0"
    :class="zIndex"
  >
    <transition
      enter-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"
        :class="[overlayStyle]"
        @click="overlayClick"
      />
    </transition>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="animate-fadeOut"
    >
      <slot />
    </transition>
  </div>
</template>
