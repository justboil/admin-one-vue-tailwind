<template>
    <nav-bar-item
      :has-divider="hasDivider"
      dropdown
      class="dropdown"
      @click="toggle"
      ref="root"
    >
      <a class="block py-2 px-3 bg-gray-100 md:bg-transparent" :class="{'flex items-center': hasUserAvatar, 'md:text-blue-500':isDropdownActive}">
        <slot />
        <icon :icon="toggleDropdownIcon" class="hidden md:inline-flex" />
      </a>
      <div class="text-sm md:border-gray-200 md:border-t-2 md:bg-white md:absolute md:top-full md:left-0 md:min-w-full md:z-20 md:shadow-md md:rounded-b" :class="{'md:hidden':!isDropdownActive}">
        <slot name="dropdown" />
      </div>
    </nav-bar-item>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import NavBarItem from '@/components/NavBarItem'
import Icon from '@/components/Icon'

export default {
  name: 'NavBarMenu',
  components: { Icon, NavBarItem },
  props: {
    isHoverable: {
      type: Boolean,
      default: false
    },
    hasDivider: {
      type: Boolean,
      default: false
    },
    hasUserAvatar: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const isDropdownActive = ref(false)

    const toggleDropdownIcon = computed(() => isDropdownActive.value ? 'chevron-up' : 'chevron-down')

    const toggle = () => {
      isDropdownActive.value = !isDropdownActive.value
    }

    const root = ref(null)

    const forceClose = event => {
      if (!root.value.$el.contains(event.target)) {
        isDropdownActive.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('click', forceClose)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('click', forceClose)
    })

    return {
      isDropdownActive,
      toggleDropdownIcon,
      toggle,
      root
    }
  }
}
</script>
