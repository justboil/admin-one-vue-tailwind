<template>
  <span :class="spanClass">
    <i :class="iClass"></i>
  </span>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Icon',
  props: ['icon', 'w', 'h', 'size'],
  setup (props) {
    const spanClass = computed(() => {
      const w = props.w ? props.w : 'w-6'
      const h = props.h ? props.h : 'h-6'

      return `inline-flex justify-center items-center ${w} ${h}`
    })

    const iClass = computed(() => {
      const base = `inline-flex mdi mdi-${props.icon}`

      return props.size ? `${base} mdi-${props.size}` : base
    })

    return { spanClass, iClass }
  }
}
</script>
