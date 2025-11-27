<script setup>
import { computed } from 'vue'
import { colorsBgLight, colorsOutline } from '@/colors.js'
import PillTagPlain from '@/components/PillTagPlain.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: String,
  small: Boolean,
  outline: Boolean,
})

const componentClass = computed(() => [
  props.small ? 'py-1 px-3' : 'py-1.5 px-4',
  props.outline ? colorsOutline[props.color] : colorsBgLight[props.color],
])
</script>

<template>
  <PillTagPlain
    class="rounded-full border"
    :class="componentClass"
    :icon="icon"
    :label="label"
    :small="small"
  />
</template>
