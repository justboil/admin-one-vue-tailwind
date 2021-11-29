<script setup>
import Control from '@/components/Control.vue'
</script>

<template>
  <control
    ref="root"
    placeholder="Search (ctrl+k)"
    ctrl-k-focus
    transparent
    borderless
  />
</template>
