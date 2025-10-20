<script setup>
import { colorsBgLight } from '@/colors.js'

defineProps({
  color: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="-mt-6 -mr-6 mb-6 -ml-6 flex animate-fade-in flex-col">
    <div :class="[colorsBgLight[color]]" class="flex flex-col rounded-t-2xl p-6 transition-colors">
      <slot />
    </div>
  </div>
</template>
