<template>
    <nav-bar-item
      :has-divider="hasDivider"
      dropdown
      class="dropdown"
      @click="toggle"
      ref="root"
    >
      <a class="flex items-center py-2 px-3 bg-gray-100 md:bg-transparent" :class="{'md:text-blue-500':isDropdownActive}">
        <slot />
        <icon :path="toggleDropdownIcon" class="hidden md:inline-flex" />
      </a>
      <div class="text-sm border-gray-100 border-b md:border-b-0 md:border-gray-200 md:border-t-2 md:bg-white md:absolute md:top-full md:left-0 md:min-w-full md:z-20 md:shadow-md md:rounded-b" :class="{'md:hidden':!isDropdownActive}">
        <slot name="dropdown" />
      </div>
    </nav-bar-item>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import NavBarItem from '@/components/NavBarItem'
import Icon from '@/components/Icon'

export default {
  name: 'NavBarMenu',
  components: { Icon, NavBarItem },
  props: {
    hasDivider: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const isDropdownActive = ref(false)

    const toggleDropdownIcon = computed(() => isDropdownActive.value ? mdiChevronUp : mdiChevronDown)

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
