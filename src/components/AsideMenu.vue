<script setup>
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { mdiMenu } from '@mdi/js'
import AsideMenuList from '@/components/AsideMenuList.vue'
import NavBarItem from '@/components/NavBarItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'

defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})

const styleStore = useStyleStore()

const layoutStore = useLayoutStore()

const menuClick = () => {
  //
}
</script>

<template>
  <aside
    v-show="!layoutStore.isFullScreen"
    id="aside"
    class="w-60 fixed top-0 z-40 h-screen transition-position lg:left-0 overflow-y-auto
    dark:border-r dark:border-gray-800 dark:bg-gray-900/70 lg:dark:bg-gray-900 xl:dark:bg-gray-900/70"
    :class="[ styleStore.asideStyle, layoutStore.isAsideMobileExpanded ? 'left-0' : '-left-60', layoutStore.isAsideLgActive ? 'block' : 'lg:hidden xl:block' ]"
  >
    <div
      class="flex flex-row w-full flex-1 h-14 items-center dark:bg-transparent"
      :class="[ styleStore.asideBrandStyle ]"
    >
      <NavBarItem
        type="hidden lg:flex xl:hidden"
        :active-color="styleStore.asideMenuCloseLgStyle"
        active
        @click="layoutStore.asideLgToggle(false)"
      >
        <BaseIcon
          :path="mdiMenu"
          class="cursor-pointer"
          size="24"
        />
      </NavBarItem>
      <div class="flex-1 px-3">
        <span>Admin</span> <b class="font-black">One</b>
      </div>
    </div>
    <div>
      <template v-for="(menuGroup, index) in menu">
        <p
          v-if="typeof menuGroup === 'string'"
          :key="`a-${index}`"
          class="p-3 text-xs uppercase"
          :class="styleStore.asideMenuLabelStyle"
        >
          {{ menuGroup }}
        </p>
        <AsideMenuList
          v-else
          :key="`b-${index}`"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>
