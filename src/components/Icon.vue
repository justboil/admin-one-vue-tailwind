<template>
  <span :class="spanClass">
    <svg viewBox="0 0 24 24" :width="size" :height="size" class="inline-block">
      <path :d="path" />
    </svg>
  </span>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Icon',
  props: {
    path: {
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
      default: 16
    }
  },
  setup (props) {
    const spanClass = computed(() => {
      return `inline-flex justify-center items-center ${props.w} ${props.h}`
    })

    return { spanClass }
  }
}
</script>

<style scoped>
/*svg {*/
/*  transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1));*/
/*}*/
path {
  fill: currentColor;
}
</style>
