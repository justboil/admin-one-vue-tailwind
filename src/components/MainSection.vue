<template>
  <section
    class="px-0 md:px-6"
    :class="[ isFullScreen ? 'flex h-screen items-center justify-center' : 'py-6' ]"
  >
    <slot/>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MainSection',
  setup () {
    const store = useStore()

    const isFullScreen = computed(() => store.state.isFullScreen)

    return {
      isFullScreen
    }
  }
}
</script>
