<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="px-6 py-2" :class="containerMaxW">
    <BaseLevel>
      <div class="flex flex-col items-center justify-center gap-6 lg:flex-row lg:justify-start">
        <b>&copy;{{ year }}, <a href="https://justboil.me/" target="_blank">JustBoil.me</a></b>
        <slot />
      </div>
      <div class="md:py-2">
        <a href="https://justboil.me">
          <JustboilLogo class="h-8 w-auto md:h-6" />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
