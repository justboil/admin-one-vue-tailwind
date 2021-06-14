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
    href: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    hasDivider: {
      type: Boolean,
      default: false
    },
    isDesktopIconOnly: {
      type: Boolean,
      default: false
    },
    dropdown: {
      type: Boolean,
      default: false
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
      let base = 'block flex-grow-0 flex-shrink-0 relative md:flex md:items-center cursor-pointer'

      if (!props.dropdown) {
        base += ' py-2 px-3'
      } else {
        base += 'p-0 md:py-2 md:px-3'
      }

      if (props.hasDivider) {
        base += ' md:border-r md:border-gray-100'
      }

      if (props.isDesktopIconOnly) {
        base += ' md:w-16 md:justify-center'
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
