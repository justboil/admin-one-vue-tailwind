<script setup>
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'flex'
  },
  activeColor: {
    type: String,
    default: null
  },
  hasDivider: Boolean,
  isDesktopIconOnly: Boolean,
  dropdown: Boolean,
  active: Boolean
})

const is = computed(() => {
  if (props.href) {
    return 'a'
  }

  if (props.to) {
    return 'router-link'
  }

  return 'div'
})

const mainStore = useMainStore()

const componentClass = computed(() => {
  const activeColor = props.activeColor ?? `${mainStore.navBarItemLabelActiveColorStyle} dark:text-gray-400`

  const base = [
    props.type,
    'items-center',
    'grow-0',
    'shrink-0',
    'relative',
    'cursor-pointer',
    props.active
      ? activeColor
      : `${mainStore.navBarItemLabelStyle} dark:text-white dark:hover:text-gray-400 ${mainStore.navBarItemLabelHoverStyle}`
  ]

  if (props.type === 'block') {
    base.push('lg:flex')
  }

  if (!props.dropdown) {
    base.push('py-2', 'px-3')
  } else {
    base.push('p-0', 'lg:py-2', 'lg:px-3')
  }

  if (props.hasDivider) {
    base.push('lg:border-r', mainStore.lightBorderStyle, 'lg:dark:border-gray-800')
  }

  if (props.isDesktopIconOnly) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})

const activeClass = computed(() => {
  return is.value === 'router-link' ? props.activeColor : null
})
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :to="to"
    :href="href"
    :exact-active-class="activeClass"
  >
    <slot />
  </component>
</template>
