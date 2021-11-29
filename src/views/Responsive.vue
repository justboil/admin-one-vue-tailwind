<script setup>
import { ref } from 'vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import TitledSection from '@/components/TitledSection.vue'
import MainSection from '@/components/MainSection.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'

const titleStack = ref(['Admin', 'Responsive layout'])
</script>

<template>
  <title-bar :title-stack="titleStack" />

  <hero-bar>Responsive layout</hero-bar>

  <titled-section first>
    Mobile & Tablet
  </titled-section>

  <main-section>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://justboil.me/images/one-tailwind/repository-preview-m-hi-res.png"
        class="block"
      >
    </div>
  </main-section>

  <titled-section>
    Small laptop 1024px
  </titled-section>

  <main-section>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://justboil.me/images/one-tailwind/repository-preview-1024.png?v=1.3"
        class="block"
      >
    </div>
  </main-section>

  <main-section>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://justboil.me/images/one-tailwind/repository-preview-1024-menu.png?v=1.3"
        class="block"
      >
    </div>
  </main-section>

  <titled-section>
    Laptop & desktop
  </titled-section>

  <main-section>
    <div class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">
      <img
        src="https://justboil.me/images/one-tailwind/repository-preview-no-libs.png?v=1.3"
        class="block"
      >
    </div>
  </main-section>

  <bottom-other-pages-section />
</template>
