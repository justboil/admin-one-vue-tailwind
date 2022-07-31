<script setup>
import { computed } from 'vue'
import { gradientBgPurplePink, gradientBgPinkRed } from '@/colors'

const props = defineProps({
  bg: {
    type: String,
    required: true,
    validator: value => ['purplePink', 'pinkRed'].includes(value)
  }
})

const colorClass = computed(() => {
  switch (props.bg) {
    case 'purplePink':
      return gradientBgPurplePink
    case 'pinkRed':
      return  gradientBgPinkRed
  }

  return ''
})

</script>
<template>
  <div
    :class="colorClass" 
    class="mt-6 mb-6 rounded-2xl py-12 px-6 text-center"
  >
    <slot />
  </div>
</template>