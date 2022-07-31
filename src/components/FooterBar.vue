<script setup>
import { computed } from 'vue'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="py-2 px-6"
  >
    <BaseLevel class="md:px-6 xl:max-w-6xl xl:mx-auto"> 
      <div class="text-center md:text-left">
        <b>&copy;{{ year }}, <a
          href="https://justboil.me/"
          target="_blank"
        >JustBoil.me</a>.</b>
      </div>
      <div class="md:py-2">
        <a href="https://justboil.me">
          <JustboilLogo class="w-auto h-8 md:h-6" />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
