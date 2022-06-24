<script setup>
import { computed } from 'vue'
import { colorsBg, colorsBorders, colorsOutline } from '@/colors.js'
import BaseIcon from '@/components/BaseIcon.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  small: Boolean,
  outline: Boolean
})

const componentClass = computed(() => {
  const baseColor = props.outline ? colorsOutline[props.type] : [colorsBg[props.type], colorsBorders[props.type]]

  return [
    'border',
    props.small ? 'py-0.5 px-2 text-xs rounded-lg mr-1.5' : 'py-2 px-4 rounded-2xl mr-3',
    ...baseColor
  ]
})
</script>

<template>
  <div
    class="inline-flex items-center last:mr-0 capitalize"
    :class="componentClass"
  >
    <BaseIcon
      v-if="icon"
      :path="icon"
      h="h-4"
      w="w-4"
      class="mr-2"
    />
    <span>{{ text }}</span>
  </div>
</template>
