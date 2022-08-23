<script setup>
import { computed } from 'vue'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="bg-white py-2 px-6 dark:bg-gray-900/70 "
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        &copy; {{ year }}, <a
          href="https://justboil.me/"
          target="_blank"
        >Thaosharehouse.com</a> , Xclude.dev
      </div>
    </BaseLevel>
  </footer>
</template>
