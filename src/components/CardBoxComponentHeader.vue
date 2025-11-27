<script setup>
import BaseIcon from '@/components/BaseIcon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: String,
  buttonIcon: String,
})

const emit = defineEmits(['button-click'])

const buttonClick = (event) => {
  emit('button-click', event)
}
</script>

<template>
  <header class="flex items-stretch border-b border-gray-100 dark:border-slate-800">
    <div class="flex grow items-center py-3 font-bold" :class="[icon ? 'px-4' : 'px-6']">
      <BaseIcon v-if="icon" :path="icon" class="mr-3" />
      {{ title }}
    </div>
    <button
      v-if="buttonIcon"
      class="flex items-center justify-center p-2 ring-blue-700 focus:ring-3"
      @click="buttonClick"
    >
      <BaseIcon :path="buttonIcon" />
    </button>
  </header>
</template>
