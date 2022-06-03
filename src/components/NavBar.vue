<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiGithub,
  mdiThemeLightDark
} from '@mdi/js'
import NavBarItem from '@/components/NavBarItem.vue'
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import Divider from '@/components/Divider.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Icon from '@/components/Icon.vue'
import NavBarSearch from '@/components/NavBarSearch.vue'

const mainStore = useMainStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const toggleLightDark = () => {
  mainStore.setDarkMode()
}

const isNavBarVisible = computed(() => !mainStore.isFullScreen)

const isAsideMobileExpanded = computed(() => mainStore.isAsideMobileExpanded)

const userName = computed(() => mainStore.userName)

const menuToggleMobileIcon = computed(() => isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger)

const menuToggleMobile = () => mainStore.asideMobileToggle()

const isMenuNavBarActive = ref(false)

const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? mdiClose : mdiDotsVertical)

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
}

const menuOpenLg = () => {
  mainStore.asideLgToggle(true)
}

const logout = () => {
  //
}
</script>

<template>
  <nav
    v-show="isNavBarVisible"
    class="top-0 left-0 right-0 fixed flex bg-white h-14 border-b z-30 w-screen
    transition-position xl:pl-60 lg:w-auto lg:items-stretch dark:bg-gray-900 dark:border-gray-800"
    :class="[lightBorderStyle, {'ml-60 lg:ml-0':isAsideMobileExpanded}]"
  >
    <div class="flex-1 items-stretch flex h-14">
      <nav-bar-item
        type="flex lg:hidden"
        @click.prevent="menuToggleMobile"
      >
        <icon
          :path="menuToggleMobileIcon"
          size="24"
        />
      </nav-bar-item>
      <nav-bar-item
        type="hidden lg:flex xl:hidden"
        @click.prevent="menuOpenLg"
      >
        <icon
          :path="mdiMenu"
          size="24"
        />
      </nav-bar-item>
      <nav-bar-item>
        <nav-bar-search />
      </nav-bar-item>
    </div>
    <div class="flex-none items-stretch flex h-14 lg:hidden">
      <nav-bar-item @click.prevent="menuNavBarToggle">
        <icon
          :path="menuNavBarToggleIcon"
          size="24"
        />
      </nav-bar-item>
    </div>
    <div
      class="absolute w-screen top-14 left-0 bg-white shadow
        lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-gray-900"
      :class="[isMenuNavBarActive ? 'block' : 'hidden']"
    >
      <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      >
        <nav-bar-menu has-divider>
          <nav-bar-item-label
            :icon="mdiMenu"
            label="Sample menu"
          />

          <template #dropdown>
            <nav-bar-item>
              <nav-bar-item-label
                :icon="mdiClockOutline"
                label="Item One"
              />
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label
                :icon="mdiCloud"
                label="Item Two"
              />
            </nav-bar-item>
            <divider nav-bar />
            <nav-bar-item>
              <nav-bar-item-label
                :icon="mdiCrop"
                label="Item Last"
              />
            </nav-bar-item>
          </template>
        </nav-bar-menu>
        <nav-bar-menu has-divider>
          <nav-bar-item-label :label="userName">
            <user-avatar class="w-6 h-6 mr-3 inline-flex" />
          </nav-bar-item-label>

          <template #dropdown>
            <nav-bar-item to="/profile">
              <nav-bar-item-label
                :icon="mdiAccount"
                label="My Profile"
              />
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label
                :icon="mdiCogOutline"
                label="Settings"
              />
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label
                :icon="mdiEmail"
                label="Messages"
              />
            </nav-bar-item>
            <divider nav-bar />
            <nav-bar-item>
              <nav-bar-item-label
                :icon="mdiLogout"
                label="Log Out"
              />
            </nav-bar-item>
          </template>
        </nav-bar-menu>
        <nav-bar-item
          has-divider
          is-desktop-icon-only
          @click.prevent="toggleLightDark"
        >
          <nav-bar-item-label
            :icon="mdiThemeLightDark"
            label="Light/Dark"
            is-desktop-icon-only
          />
        </nav-bar-item>
        <nav-bar-item
          href="https://github.com/justboil/admin-one-vue-tailwind"
          has-divider
          is-desktop-icon-only
        >
          <nav-bar-item-label
            :icon="mdiGithub"
            label="GitHub"
            is-desktop-icon-only
          />
        </nav-bar-item>
        <nav-bar-item
          is-desktop-icon-only
          @click="logout"
        >
          <nav-bar-item-label
            :icon="mdiLogout"
            label="Log out"
            is-desktop-icon-only
          />
        </nav-bar-item>
      </div>
    </div>
  </nav>
</template>
