<script setup>
import { ref } from 'vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'

const titleStack = ref(['Admin', 'Responsive layout'])
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />

  <SectionHeroBar>Responsive layout</SectionHeroBar>

  <SectionTitle first>
    Mobile & Tablet
  </SectionTitle>

  <SectionMain>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://static.justboil.me/templates/one/one-tailwind-vue-mobile.png"
        class="block"
      >
    </div>
  </SectionMain>

  <SectionTitle>
    Small laptop 1024px
  </SectionTitle>

  <SectionMain>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://static.justboil.me/templates/one/one-tailwind-vue-1024.png"
        class="block"
      >
    </div>
  </SectionMain>

  <SectionMain>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://static.justboil.me/templates/one/one-tailwind-vue-1024-menu-open.png"
        class="block"
      >
    </div>
  </SectionMain>

  <SectionTitle>
    Laptop & desktop
  </SectionTitle>

  <SectionMain>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://static.justboil.me/templates/one/one-tailwind-vue-widescreen.png"
        class="block"
      >
    </div>
  </SectionMain>

  <SectionBottomOtherPages />
</template>
