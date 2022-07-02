<script setup>
import { useStyleStore } from '@/stores/style.js'
import { RouterLink } from 'vue-router'
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
    return RouterLink
  }

  return 'div'
})

const styleStore = useStyleStore()

const activeColor = props.activeColor ?? `${styleStore.navBarItemLabelActiveColorStyle} dark:text-gray-400`

const componentClass = computed(() => {
  const base = [
    props.type,
    'items-center',
    'grow-0',
    'shrink-0',
    'relative',
    'cursor-pointer',
    props.active
      ? activeColor
      : `${styleStore.navBarItemLabelStyle} dark:text-white dark:hover:text-gray-400 ${styleStore.navBarItemLabelHoverStyle}`
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
    base.push('lg:border-r', 'border-gray-100', 'lg:dark:border-gray-800')
  }

  if (props.isDesktopIconOnly) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :to="to"
    :href="href"
  >
    <slot />
  </component>
</template>
