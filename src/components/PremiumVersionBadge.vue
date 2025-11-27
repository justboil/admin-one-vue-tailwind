<script setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { mdiStar } from '@mdi/js'
</script>

<template>
  <a
    href="https://tailwind-vue.justboil.me/"
    target="_blank"
    class="hover:via-ping-600 flex items-center justify-center rounded-full bg-linear-to-tr from-purple-400 via-pink-500 to-red-500 px-4 py-1.5 text-white transition-all hover:from-purple-500 hover:to-red-600"
  >
    <BaseIcon :path="mdiStar" w="w-4" h="h-4" />
    <span class="ms-1.5 text-sm font-bold">Premium version</span>
  </a>
</template>
