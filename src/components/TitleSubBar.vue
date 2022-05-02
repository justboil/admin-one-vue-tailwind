<script setup>
import { mdiCog } from '@mdi/js'
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import Icon from '@/components/Icon.vue'
import JbButton from '@/components/JbButton.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  }
})

const mainStore = useMainStore()

const darkMode = computed(() => mainStore.darkMode)
</script>

<template>
  <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <icon
        v-if="icon"
        :path="icon"
        class="mr-3"
      />
      <h1 class="text-2xl">
        {{ title }}
      </h1>
    </div>
    <jb-button
      :icon="mdiCog"
      :outline="darkMode"
      small
    />
  </section>
</template>
