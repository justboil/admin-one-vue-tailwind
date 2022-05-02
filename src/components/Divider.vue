<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const props = defineProps({
  navBar: Boolean
})

const mainStore = useMainStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)
</script>

<template>
  <hr
    :class="[lightBorderStyle, props.navBar ? 'hidden lg:block lg:my-0.5 dark:border-gray-700' : 'my-6 -mx-6 dark:border-gray-800']"
    class="border-t"
  >
</template>
