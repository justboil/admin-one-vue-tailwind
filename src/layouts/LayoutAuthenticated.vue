<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import NavBar from "@/components/NavBar.vue";
import { useAuthStore } from "@/stores/auth";

useMainStore().setUser({
  name: localStorage.getItem('userName'),
  email: "john@example.com",
  avatar:
    "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
});

const styleStore = useStyleStore();
const authStore = useAuthStore();

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const handleLogout = async () => {
  try {
    await authStore.logout();

    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    handleLogout();
  }
};
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
    }"
  >
    <div
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        @menu-click="menuClick"
      >
      </NavBar>
      <slot />
    </div>
  </div>
</template>
