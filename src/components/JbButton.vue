<template>
  <component :is="is" :class="componentClass" :href="href" :type="computedType" :to="to" :target="target">
    <icon v-if="icon" :path="icon" />
    <span v-if="label" :class="labelClass">{{ label }}</span>
  </component>
</template>

<script>
import { mdiMenuUp } from '@mdi/js'
import { computed } from 'vue'
import { colorsButtons, colorsButtonsOutline } from '@/colors.js'
import Icon from '@/components/Icon'

export default {
  name: 'JbButton',
  components: {
    Icon
  },
  props: {
    label: [String, Number],
    icon: String,
    href: String,
    target: String,
    to: [String, Object],
    type: String,
    color: {
      type: String,
      default: 'white'
    },
    small: Boolean,
    outline: Boolean,
    active: Boolean,
    as: String
  },
  setup (props) {
    const is = computed(() => {
      if (props.as) {
        return props.as
      }

      if (props.to) {
        return 'router-link'
      }

      if (props.href) {
        return 'a'
      }

      return 'button'
    })

    const computedType = computed(() => {
      if (is.value === 'button') {
        return props.type ?? 'button'
      }

      return null
    })

    const iconOnly = computed(() => props.icon && !props.label)

    const labelClass = computed(() => props.small && props.icon ? 'px-1' : 'px-2')

    const componentClass = computed(() => {
      const base = [
        'inline-flex',
        'cursor-pointer',
        'justify-center',
        'items-center',
        'whitespace-nowrap',
        'focus:outline-none',
        'transition-colors',
        'focus:ring',
        'duration-150',
        'border',
        'rounded',
        props.active ? 'ring ring-black dark:ring-white' : 'ring-blue-700',
        props.small ? 'p-1' : 'p-2',
        props.outline ? colorsButtonsOutline[props.color] : colorsButtons[props.color]
      ]

      return base
    })

    return {
      is,
      iconOnly,
      labelClass,
      computedType,
      componentClass,
      mdiMenuUp
    }
  }
}
</script>
