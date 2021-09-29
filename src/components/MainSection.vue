<template>
  <section
    class="px-0 md:px-6"
    :class="[ isFormScreen ? 'flex h-screen items-center justify-center' : 'py-6' ]"
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

    const isFormScreen = computed(() => store.state.isFormScreen)

    return {
      isFormScreen
    }
  }
}
</script>
