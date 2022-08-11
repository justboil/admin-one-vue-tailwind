<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import menuAside from '@/menuAside.js'
import AsideMenuLayer from '@/components/AsideMenuLayer.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'

const layoutStore = useLayoutStore()
</script>

<template>
  <AsideMenuLayer
    :menu="menuAside"
    :class="[layoutStore.isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0', {'lg:hidden xl:flex': !layoutStore.isAsideLgActive}]"
  />
  <OverlayLayer
    v-show="layoutStore.isAsideLgActive"
    z-index="z-30"
    @overlay-click="layoutStore.isAsideLgActive = false"
  />
</template>
