<script setup>
import Icon from '@/components/Icon.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
  },
  isDesktopIconOnly: Boolean
}
)
</script>

<template>
  <slot />
  <icon
    v-if="icon"
    :path="icon"
    class="transition-colors"
  />
  <span
    class="px-2 transition-colors"
    :class="{ 'lg:hidden':isDesktopIconOnly && icon }"
  >{{ label }}</span>
</template>
