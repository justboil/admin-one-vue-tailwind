<script setup>
import { mdiThemeLightDark } from '@mdi/js'
import { useStyleStore } from '@/stores/style.js'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButton from '@/components/BaseButton.vue'

const styleStore = useStyleStore()
</script>

<template>
  <section
    class="bg-white border-t border-b border-gray-100 p-6 dark:bg-gray-900/70 dark:border-gray-900 dark:text-white"
  >
    <BaseLevel>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <BaseButton
        :label="styleStore.darkMode ? 'Light Mode' : 'Dark Mode'"
        :icon="mdiThemeLightDark"
        @click="styleStore.setDarkMode()"
      />
    </BaseLevel>
  </section>
</template>
