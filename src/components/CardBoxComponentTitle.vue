<script setup>
import BaseIcon from './BaseIcon.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  iconSize: {
    type: [String, Number],
    default: null,
  },
  small: Boolean,
});
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-2xl">
      {{ title }} <BaseIcon v-if="icon" :path="icon" :size="iconSize" />
    </h1>
    <slot />
  </div>
</template>
