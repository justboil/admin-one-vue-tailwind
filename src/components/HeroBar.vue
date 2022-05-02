<script setup>
import { mdiThemeLightDark } from '@mdi/js'
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'
import Level from '@/components/Level.vue'
import JbButton from '@/components/JbButton.vue'

const mainStore = useMainStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const darkMode = computed(() => mainStore.darkMode)

const darkModeToggle = () => {
  mainStore.setDarkMode()
}
</script>

<template>
  <section
    :class="lightBorderStyle"
    class="bg-white border-t border-b p-6 dark:bg-gray-900/70 dark:border-gray-900 dark:text-white"
  >
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
