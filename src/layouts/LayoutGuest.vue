<script setup>
import { useStyleStore } from '@/stores/style.js'

const styleStore = useStyleStore()
</script>

<template>
  <div :class="styleStore.appStyle">
    <slot />
  </div>
</template>
