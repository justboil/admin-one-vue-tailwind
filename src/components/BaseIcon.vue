<script setup>
import { computed } from 'vue'

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  w: {
    type: String,
    default: 'w-6'
  },
  h: {
    type: String,
    default: 'h-6'
  },
  size: {
    type: [String, Number],
    default: 16
  }
})

const spanClass = computed(() => `inline-flex justify-center items-center ${props.w} ${props.h}`)
</script>

<template>
  <span :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="size"
      :height="size"
      class="inline-block"
    >
      <path
        fill="currentColor"
        :d="path"
      />
    </svg>
  </span>
</template>
