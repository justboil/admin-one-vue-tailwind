<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import { useStyleStore } from '@/stores/style.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

const styleStore = useStyleStore()

const layoutStore = useLayoutStore()
</script>

<template>
  <div :class="{ 'dark': styleStore.darkMode, 'overflow-hidden lg:overflow-visible': layoutStore.isAsideMobileExpanded }">
    <div
      :class="{ 'ml-60 lg:ml-0': layoutStore.isAsideMobileExpanded }"
      class="pt-14 xl:pl-60 w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar :class="{ 'ml-60 lg:ml-0': layoutStore.isAsideMobileExpanded }" />
      <AsideMenu />
      <slot />
      <FooterBar />
    </div>
  </div>
</template>
