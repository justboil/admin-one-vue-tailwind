<script setup>
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
</script>

<template>
  <CardBoxComponentBody class="mr-3 overflow-y-auto py-6 pr-3 pl-6" no-padding>
    <div class="space-y-3">
      <slot />
    </div>
  </CardBoxComponentBody>
</template>
