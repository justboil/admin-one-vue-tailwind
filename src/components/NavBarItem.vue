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
    activeColor: {
      type: String,
      default: 'text-blue-600'
    },
    pX: String
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
        'cursor-pointer',
        'hover:text-blue-500',
        props.active ? props.activeColor : 'text-black dark:text-white dark:hover:text-gray-400'
      ]

      if (props.type === 'block') {
        base.push('lg:flex')
      }

      if (!props.dropdown) {
        base.push('py-2', props.pX ?? 'px-3')
      } else {
        base.push('p-0', 'lg:py-2', props.pX ?? 'lg:px-3')
      }

      if (props.hasDivider) {
        base.push('lg:border-r', 'lg:border-gray-100', 'lg:dark:border-gray-800')
      }

      if (props.isDesktopIconOnly) {
        base.push('lg:w-16', 'lg:justify-center')
      }

      return base
    })

    const activeClass = computed(() => {
      return is.value === 'router-link' ? 'text-blue-500' : null
    })

    return { is, componentClass, activeClass }
  }
}
</script>
