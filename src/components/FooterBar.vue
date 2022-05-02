<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import Level from '@/components/Level.vue'
import JbLogo from '@/components/JbLogo.vue'

const mainStore = useMainStore()

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !mainStore.isFullScreen)
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 dark:bg-gray-900/70"
  >
    <level>
      <div class="text-center md:text-left">
        <b>&copy; {{ year }}, <a
          href="https://justboil.me/"
          target="_blank"
        >JustBoil.me</a>.</b>
        Get more with <a
          href="https://justboil.me/tailwind-admin-templates/vue-dashboard/"
          target="_blank"
          class="text-blue-600"
        >Premium version</a>
      </div>
      <div class="md:py-2">
        <a href="https://justboil.me">
          <jb-logo class="w-auto h-8 md:h-6" />
        </a>
      </div>
    </level>
  </footer>
</template>
