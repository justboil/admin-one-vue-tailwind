<script setup>
import AsideMenu from '@/components/AsideMenu.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import FooterBar from '@/components/FooterBar.vue';
import FormControl from '@/components/FormControl.vue';
import NavBar from '@/components/NavBar.vue';
import NavBarItemPlain from '@/components/NavBarItemPlain.vue';
import menuAside from '@/menuAside.js';
import menuNavBar from '@/menuNavBar.js';
import { useDarkModeStore } from '@/stores/darkMode.js';
import { router } from '@inertiajs/vue3';
import { mdiBackburger, mdiForwardburger, mdiMenu } from '@mdi/js';
import { ref } from 'vue';

const layoutAsidePadding = 'xl:pl-60';

const darkModeStore = useDarkModeStore();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.on('navigate', () => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set(null, true);
  }

  if (item.isLogout) {
    router.post('/logout');
  }
};
</script>

<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="transition-(--transition-position) min-h-screen w-screen bg-gray-50 pt-14 lg:w-auto dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar>
        Get more with
        <a href="https://tailwind-vue.justboil.me/" target="_blank" class="text-blue-600"
          >Premium version</a
        >
      </FooterBar>
    </div>
  </div>
</template>
