<template>
  <div class="inline-flex items-center last:mr-0" :class="componentClass">
    <icon v-if="icon" :path="icon" h="h-4" w="w-4" class="mr-2" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { colorsBg, colorsBorders, colorsOutline } from '@/colors.js'
import Icon from '@/components/Icon'

export default {
  name: 'Pill',
  components: {
    Icon
  },
  props: {
    text: String,
    type: {
      type: String,
      required: true
    },
    icon: String,
    small: Boolean,
    outline: Boolean
  },
  setup (props) {
    const componentClass = computed(() => {
      const base = [
        'border',
        props.small ? 'py-0.5 px-2 text-xs rounded-lg mr-1.5' : 'py-2 px-4 rounded-2xl mr-3'
      ]

      return [
        ...base,
        props.outline ? colorsOutline[props.type] : [...colorsBg[props.type], colorsBorders[props.type]]
      ]
    })

    return {
      componentClass
    }
  }
}
</script>
