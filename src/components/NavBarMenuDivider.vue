<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)
</script>

<template>
  <hr
    :class="lightBorderStyle"
    class="hidden lg:block lg:my-0.5 border-t dark:border-gray-700"
  >
</template>
