<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
      <jb-button href="https://tailwind-vue.justboil.me/" target="_blank" label="Premium version" :icon="mdiMonitorClean" />
    </level>
  </section>
</template>

<script>
import { mdiMonitorClean } from '@mdi/js'
import Level from '@/components/Level'
import JbButton from '@/components/JbButton'

export default {
  name: 'HeroBar',
  components: {
    Level,
    JbButton
  },
  setup () {
    return {
      mdiMonitorClean
    }
  }
}
</script>
