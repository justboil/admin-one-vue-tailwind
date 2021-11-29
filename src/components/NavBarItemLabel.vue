<script setup>
import Icon from '@/components/Icon.vue'

const props = defineProps({
    icon: {
      type: String,
      required: true
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
  <icon
    :path="icon"
    class="transition-colors"
  />
  <span
    class="px-2 transition-colors"
    :class="{'lg:hidden':isDesktopIconOnly}"
  >{{ label }}</span>
</template>
