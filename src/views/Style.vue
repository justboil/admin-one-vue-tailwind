<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { sectionBgLogin } from '@/colors.js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import JbLogo from '@/components/JbLogo.vue'

const styles = [
  {
    slug: 'white',
    title: 'White'
  },
  {
    slug: 'basic',
    title: 'Basic'
  }
]

const mainStore = useMainStore()

mainStore.setDarkMode(false)

const router = useRouter()

const click = slug => {
  mainStore.setStyle(slug)
  mainStore.setDarkMode(false)
  router.push('/dashboard')
}
</script>

<template>
  <main-section
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
      <card-component
        v-for="style in styles"
        :key="style"
        class="cursor-pointer shadow-2xl"
        rounded="rounded-2xl"
        hoverable
        @click="click(style.slug)"
      >
        <div class="mb-3 md:mb-6">
          <img
            :src="`https://static.justboil.me/templates/one/small/${style.slug}.png`"
            width="955"
            height="540"
          >
        </div>

        <h1 class="text-xl md:text-2xl font-black">
          {{ style.title }}
        </h1>
        <h2 class="text-lg md:text-xl">
          & Dark mode
        </h2>
      </card-component>
    </div>
    <div class="mx-auto mt-12 mb-6">
      <a href="https://justboil.me">
        <jb-logo class="w-auto h-8 md:h-10 mx-auto text-white" />
      </a>
    </div>
  </main-section>
</template>
