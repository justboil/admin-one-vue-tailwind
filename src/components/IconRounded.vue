<script setup>
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'
import { colorsText, colorsBg } from '@/colors.js'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  w: {
    type: String,
    default: 'w-12'
  },
  h: {
    type: String,
    default: 'h-12'
  },
  bg: Boolean
})

const mainStore = useMainStore()

const iconStyle = computed(
  () => props.bg ? colorsBg[props.type] : [colorsText[props.type], `${mainStore.lightBgStyle} dark:bg-gray-800`]
)
</script>

<template>
  <icon
    :path="icon"
    :w="w"
    :h="h"
    size="24"
    class="rounded-full"
    :class="iconStyle"
  />
</template>
