<script setup>
import { useRouter } from 'vue-router'
import { useStyleStore } from '@/stores/style.js'
import { sectionBgLogin } from '@/colors.js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const styles = [
  'white',
  'basic'
]

const styleStore = useStyleStore()

styleStore.setDarkMode(false)

const router = useRouter()

const click = slug => {
  styleStore.setStyle(slug)
  styleStore.setDarkMode(false)
  router.push('/dashboard')
}
</script>

<template>
  <SectionMain
    :class="sectionBgLogin"
    class="min-h-screen"
  >
    <h1 class="text-4xl md:text-6xl text-center text-white font-bold mt-6 mb-3 md:mt-12 md:mb-6">
      Pick a style&hellip;
    </h1>
    <h2 class="text-xl md:text-2xl text-center text-white mb-12 md:mb-24">
      Style switching with a single <code class="px-1.5 py-0.5 rounded bg-white bg-opacity-20">action()</code>
    </h2>
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2 px-6 max-w-6xl mx-auto">
      <CardBox
        v-for="style in styles"
        :key="style"
        class="cursor-pointer shadow-2xl"
        rounded="rounded-2xl"
        hoverable
        @click="click(style)"
      >
        <div class="mb-3 md:mb-6">
          <img
            :src="`https://static.justboil.me/templates/one/small/${style}.png`"
            width="955"
            height="540"
          >
        </div>

        <h1 class="text-xl md:text-2xl font-black capitalize">
          {{ style }}
        </h1>
        <h2 class="text-lg md:text-xl">
          & Dark mode
        </h2>
      </CardBox>
    </div>
    <div class="mx-auto mt-12 mb-6">
      <a href="https://justboil.me">
        <JustboilLogo class="w-auto h-8 md:h-10 mx-auto text-white" />
      </a>
    </div>
  </SectionMain>
</template>
