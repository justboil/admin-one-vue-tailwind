<script setup>
import { mdiThemeLightDark } from '@mdi/js'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Level from '@/components/Level.vue'
import JbButton from '@/components/JbButton.vue'

const store = useStore()

const darkMode = computed(() => store.state.darkMode)

const darkModeToggle = () => {
  store.dispatch('darkMode')
}
</script>

<template>
  <section class="bg-white border-t border-b border-gray-100 p-6 dark:bg-gray-900 dark:border-gray-900 dark:text-white">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <jb-button
        :label="darkMode ? 'Light Mode' : 'Dark Mode'"
        :icon="mdiThemeLightDark"
        :outline="darkMode"
        @click="darkModeToggle"
      />
    </level>
  </section>
</template>
