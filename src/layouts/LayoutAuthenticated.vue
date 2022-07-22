<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout.js'
import { useStyleStore } from '@/stores/style.js'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'

const styleStore = useStyleStore()

const layoutStore = useLayoutStore()

const isAsideLgActive = computed(() => layoutStore.isAsideLgActive)

const overlayClick = () => {
  layoutStore.asideLgToggle(false)
}
</script>

<template>
  <div
    :class="[styleStore.bgStyle, { 'ml-60 lg:ml-0': layoutStore.isAsideMobileExpanded }]"
    class="pt-14 xl:pl-60 w-screen transition-position lg:w-auto"
  >
    <NavBar />
    <AsideMenu :menu="menu" />
    <slot />
    <FooterBar />
    <OverlayLayer
      v-show="isAsideLgActive"
      z-index="z-30"
      @overlay-click="overlayClick"
    />
  </div>
</template>
