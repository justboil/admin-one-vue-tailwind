<script setup>
import { useStyleStore } from '@/stores/style.js'
import { darkModeKey, styleKey } from '@/configs/config.js'

useHead({
  titleTemplate: (titleChunk) => {
    const titleBase = 'Admin One Vue 3 Tailwind'

    return titleChunk ? `${titleChunk} - ${titleBase}` : titleBase
  }
})

const styleStore = useStyleStore()

const currentStyle = typeof localStorage !== 'undefined' && localStorage[styleKey]
    ? localStorage[styleKey]
    : 'basic'

styleStore.setStyle(currentStyle)

const currentStoredDarkMode = typeof localStorage !== 'undefined' && localStorage[darkModeKey] === '1'

if ((!currentStoredDarkMode && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) || currentStoredDarkMode) {
  styleStore.setDarkMode(true)
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>