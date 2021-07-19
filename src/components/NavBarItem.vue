<template>
  <component :is="is" :class="componentClass" :to="to" :href="href" :exact-active-class="activeClass">
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'NavBarItem',
  props: {
    href: String,
    to: String,
    hasDivider: Boolean,
    isDesktopIconOnly: Boolean,
    dropdown: Boolean,
    active: Boolean,
    type: {
      type: String,
      default: 'flex'
    },
    pX: String,
    color: {
      type: String,
      default: 'text-gray-900 hover:text-blue-500'
    }
  },
  setup (props) {
    const is = computed(() => {
      if (props.href) {
        return 'a'
      }

      if (props.to) {
        return 'router-link'
      }

      return 'div'
    })

    const componentClass = computed(() => {
      const base = [
        props.type,
        'items-center',
        'flex-grow-0',
        'flex-shrink-0',
        'relative',
        props.color,
        'cursor-pointer',
        'transition-colors',
        'duration-150'
      ]

      if (props.type === 'block') {
        base.push('lg:flex')
      }

      if (props.active) {
        base.push('text-blue-600')
      }

      if (!props.dropdown) {
        base.push('py-2', props.pX ?? 'px-3')
      } else {
        base.push('p-0', 'lg:py-2', props.pX ?? 'lg:px-3')
      }

      if (props.hasDivider) {
        base.push('lg:border-r', 'lg:border-gray-100')
      }

      if (props.isDesktopIconOnly) {
        base.push('lg:w-16', 'lg:justify-center')
      }

      return base.join(' ')
    })

    const activeClass = computed(() => {
      return is.value === 'router-link' ? 'text-blue-500' : null
    })

    return { is, componentClass, activeClass }
  }
}
</script>
