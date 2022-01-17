<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  navBar: Boolean
})

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)
</script>

<template>
  <hr
    :class="[lightBorderStyle, props.navBar ? 'hidden lg:block lg:my-0.5' : 'my-6 -mx-6']"
    class="border-t dark:border-gray-700">
</template>
