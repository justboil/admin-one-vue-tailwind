<script setup>
import { useRouter } from 'vue-router'
import { useDarkModeStore } from '@/stores/darkMode.js'
import { gradientBgPurplePink } from '@/colors.js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const styles = ['basic', 'white']

const darkModeStore = useDarkModeStore()

darkModeStore.set(false)

const router = useRouter()

const handleStyleChange = (slug) => {
  document.documentElement.classList.forEach((token) => {
    if (token.indexOf('style') === 0) {
      document.documentElement.classList.replace(token, `style-${slug}`)
    }
  })

  router.push('/dashboard')
}
</script>

<template>
  <LayoutGuest>
    <div :class="gradientBgPurplePink" class="flex min-h-screen items-center justify-center">
      <SectionMain>
        <h1 class="mt-12 mb-3 text-center text-4xl font-bold text-white md:text-5xl lg:mt-0">
          Pick a style&hellip;
        </h1>
        <h2 class="mb-12 text-center text-xl text-white md:text-xl">
          Style switching with a single
          <code class="rounded-sm bg-white/20 px-1.5 py-0.5">modifier</code>
        </h2>
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-2">
          <CardBox
            v-for="style in styles"
            :key="style"
            class="cursor-pointer bg-gray-50"
            is-hoverable
            @click="handleStyleChange(style)"
          >
            <div class="mb-3 md:mb-6">
              <img
                :src="`https://static.justboil.me/templates/one/small/${style}-v3.png`"
                width="1280"
                height="720"
              />
            </div>

            <h1 class="text-xl font-black capitalize md:text-2xl">
              {{ style }}
            </h1>
            <h2 class="text-lg md:text-xl">& Dark mode</h2>
          </CardBox>
        </div>
      </SectionMain>
    </div>
  </LayoutGuest>
</template>
