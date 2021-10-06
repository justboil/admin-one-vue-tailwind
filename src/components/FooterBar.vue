<template>
  <footer v-show="isFooterBarVisible" class="bg-white py-2 px-6 dark:bg-gray-900">
    <level>
      <div>
        <b>&copy; {{ year }}, <a href="https://justboil.me/" target="_blank">JustBoil.me</a>.</b>
        Get more with <a href="https://justboil.me/tailwind-admin-templates/vue-dashboard" target="_blank" class="text-blue-500">Premium version</a>
      </div>
      <div class="md:py-2">
      <a href="https://justboil.me">
          <jb-logo class="w-auto h-8 md:h-6" />
      </a>
      </div>
    </level>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Level from '@/components/Level'
import JbLogo from '@/components/JbLogo'

export default {
  name: 'FooterBar',
  components: {
    Level,
    JbLogo
  },
  setup () {
    const store = useStore()

    const year = computed(() => new Date().getFullYear())

    const isFooterBarVisible = computed(() => !store.state.isFullScreen)

    return {
      year,
      isFooterBarVisible
    }
  }
}
</script>
