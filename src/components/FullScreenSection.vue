<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { sectionBgLogin, sectionBgLoginDark, sectionBgError, sectionBgErrorDark } from '@/colors'
import MainSection from '@/components/MainSection.vue'

const props = defineProps({
  bg: {
    type: String,
    required: true,
    validator: value => ['login', 'error'].includes(value)
  }
})

const store = useStore()

const darkMode = computed(() => store.state.darkMode)

const colorClass = computed(() => {
  switch (props.bg) {
    case 'login':
      return darkMode.value ? sectionBgLoginDark : sectionBgLogin
    case 'error':
      return darkMode.value ? sectionBgErrorDark : sectionBgError
  }

  return ''
})
</script>

<template>
  <main-section
    class="flex h-screen items-center justify-center"
    :class="colorClass"
  >
    <slot
      card-class="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl"
      card-rounded="rounded-lg"
    />
  </main-section>
</template>
