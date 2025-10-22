<script setup>
import { colorsBgLight } from '@/colors.js'
import { useDarkModeStore } from '@/stores/darkMode'

defineProps({
  color: {
    type: String,
    required: true,
  },
})

const darkModeStore = useDarkModeStore()
</script>

<template>
  <div class="-mt-6 -mr-6 mb-6 -ml-6 flex animate-fade-in flex-col">
    <div
      :class="[colorsBgLight[color], { 'transition-colors': !darkModeStore.isInProgress }]"
      class="flex flex-col rounded-t-2xl p-6"
    >
      <slot />
    </div>
  </div>
</template>
