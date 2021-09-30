<template>
  <nav-bar-item
    type="block"
    :has-divider="hasDivider"
    :active="isDropdownActive"
    dropdown
    class="dropdown"
    @click="toggle"
    ref="root"
  >
    <a class="flex items-center py-2 px-3 bg-gray-100 dark:bg-gray-800 lg:bg-transparent lg:dark:bg-transparent">
      <slot />
      <icon :path="toggleDropdownIcon" class="hidden lg:inline-flex transition-colors" />
    </a>
    <div
      class="text-sm border-gray-100 border-b lg:border-b-0 lg:border-gray-200 lg:border-t lg:bg-white lg:absolute
          lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:shadow-md lg:rounded-b lg:dark:bg-gray-800
          dark:border-gray-700"
      :class="{'lg:hidden':!isDropdownActive}"
    >
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
