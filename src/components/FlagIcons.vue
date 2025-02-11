<script setup>
import { computed } from 'vue';

const props = defineProps({
  comunidad: {
    type: Number,
    required: true
  }
})

const flagPath = computed(() => {
  return `/src/assets/icons/${props.comunidad}.svg`
})
</script>

<template>
  <img :src="flagPath" :alt="comunidad" class="w-6 h-6 mr-2" />
</template>