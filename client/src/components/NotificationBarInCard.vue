<script setup>
import { colorsBgLight } from '@/colors.js'

defineProps({
  color: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col mb-6 -mt-6 -mr-6 -ml-6 animate-fade-in">
    <div :class="[colorsBgLight[color]]" class="rounded-t-2xl flex flex-col p-6 transition-colors">
      <slot />
    </div>
  </div>
</template>
