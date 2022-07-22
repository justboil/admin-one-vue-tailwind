<script setup>
import { useStyleStore } from '@/stores/style.js'

const styleStore = useStyleStore()
</script>

<template>
  <div :class="{ 'dark': styleStore.darkMode }">
    <div :class="styleStore.appStyle">
      <slot />
    </div>
  </div>
</template>
