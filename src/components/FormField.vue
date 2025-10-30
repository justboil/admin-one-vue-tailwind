<script setup>
import { computed, useSlots } from 'vue'

defineProps({
  label: String,
  labelFor: String,
  help: String,
  error: String,
})

const slots = useSlots()

const wrapperClass = computed(() => {
  const base = []
  const slotsLength = slots.default().length

  if (slotsLength > 1) {
    base.push('grid grid-cols-1 gap-3')
  }

  if (slotsLength === 2) {
    base.push('md:grid-cols-2')
  }

  return base
})
</script>

<template>
  <div class="mb-6 last:mb-0">
    <label
      v-if="label"
      :for="labelFor"
      class="mb-2 block font-bold"
      :class="{ 'text-red-600 dark:text-red-500': !!error }"
      >{{ label }}</label
    >
    <div :class="wrapperClass">
      <slot />
    </div>
    <div
      v-if="help || error"
      class="mt-1 text-xs"
      :class="error ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-slate-400'"
    >
      {{ error ?? help }}
    </div>
  </div>
</template>
