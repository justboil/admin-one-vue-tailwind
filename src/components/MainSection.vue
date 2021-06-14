<template>
  <section class="p-6" :class="{'flex h-screen items-center justify-center':isFormScreen}">
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
