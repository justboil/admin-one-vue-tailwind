<template>
  <icon :path="icon" :w="w" :h="h" size="24" class="rounded-full" :class="iconStyle"/>
</template>

<script>
import { computed } from 'vue'
import { colorsText, colorsBg } from '@/colors.js'
import Icon from '@/components/Icon'

export default {
  name: 'IconRounded',
  components: {
    Icon
  },
  props: {
    icon: String,
    type: String,
    bg: Boolean,
    w: {
      type: String,
      default: 'w-12'
    },
    h: {
      type: String,
      default: 'h-12'
    }
  },
  setup (props) {
    const iconStyle = computed(
      () => props.bg ? colorsBg[props.type] : [...colorsText[props.type], 'bg-gray-50 dark:bg-gray-800']
    )

    return {
      iconStyle
    }
  }
}
</script>
