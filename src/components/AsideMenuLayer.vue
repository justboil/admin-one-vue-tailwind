<script setup>
import { mdiClose } from '@mdi/js'
import AsideMenuList from '@/components/AsideMenuList.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import PremiumVersionBadge from './PremiumVersionBadge.vue'

defineProps({
  menu: {
    type: Array,
    required: true,
  },
  menuBottom: Array,
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside
    id="aside"
    class="fixed top-0 z-40 flex h-screen w-60 overflow-hidden transition-(--transition-position) lg:py-2 lg:pl-2"
  >
    <div class="aside flex flex-1 flex-col overflow-hidden lg:rounded-2xl dark:bg-slate-900">
      <div class="aside-brand flex h-14 flex-row items-center justify-between dark:bg-slate-900">
        <div class="flex-1 text-center lg:pl-6 lg:text-left xl:pl-0 xl:text-center">
          <b class="font-black">One</b>
        </div>
        <button class="hidden p-3 lg:inline-block xl:hidden" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        class="aside-scrollbar flex-1 overflow-x-hidden overflow-y-auto dark:scrollbar-styled-dark"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
        <div class="px-6 py-3">
          <PremiumVersionBadge />
        </div>
      </div>

      <AsideMenuList v-if="menuBottom" :menu="menuBottom" @menu-click="menuClick" />
    </div>
  </aside>
</template>
