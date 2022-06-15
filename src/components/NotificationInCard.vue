<script setup>
import { computed } from 'vue'
import { colorsBg, colorsBorders } from '@/colors.js'

const props = defineProps({
  color: {
    type: String,
    required: true
  }
})

const componentClass = computed(() => [colorsBg[props.color], colorsBorders[props.color]])
</script>

<template>
  <div class="flex flex-col mb-6 -mt-6 -mr-6 -ml-6">
    <div
      :class="componentClass"
      class="flex flex-col -m-px p-6 rounded-t-lg"
    >
      <slot />
    </div>
  </div>
</template>
