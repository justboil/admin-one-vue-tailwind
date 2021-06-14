<template>
  <nav
    v-show="isNavBarVisible"
    class="top-0 left-0 right-0 fixed flex bg-white h-14 border-b border-gray-100 z-30 w-screen transition-all md:pl-60 md:w-auto md:items-stretch"
    :class="{'ml-60':isAsideMobileExpanded}"
  >
    <div class="flex-1 items-stretch flex h-14">
      <nav-bar-item class="items-center flex md:hidden" @click.prevent="menuToggleMobile">
        <icon :icon="menuToggleMobileIcon" size="24px" />
      </nav-bar-item>
      <nav-bar-item>
        <div class="control">
          <input class="input border-0" placeholder="Search everywhere..." />
        </div>
      </nav-bar-item>
    </div>
    <div class="flex-none items-stretch flex h-14 md:hidden">
      <nav-bar-item class="items-center flex" @click.prevent="menuNavBarToggle">
        <icon :icon="menuNavBarToggleIcon" size="24px" />
      </nav-bar-item>
    </div>
    <div class="absolute w-screen top-14 left-0 bg-white border-b border-gray-100 overflow-auto shadow max-height-screen-menu md:items-stretch md:flex md:flex-grow md:static md:border-b-0 md:overflow-visible md:shadow-none" :class="{ 'hidden': !isMenuNavBarActive, 'block': isMenuNavBarActive }">
      <div class="md:flex md:items-stretch md:justify-end md:ml-auto">
        <nav-bar-menu :has-divider="true">
          <nav-bar-item-label icon="menu" label="Sample menu"/>

          <template #dropdown>
            <nav-bar-item to="/profile">
              <nav-bar-item-label icon="account" label="My Profile"/>
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label icon="settings" label="Settings"/>
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label icon="email" label="Messages"/>
            </nav-bar-item>
            <hr />
            <nav-bar-item>
              <nav-bar-item-label icon="logout" label="Log Out"/>
            </nav-bar-item>
          </template>
        </nav-bar-menu>
        <nav-bar-menu :has-divider="true" :has-user-avatar="true">
          <user-avatar class="w-6 h-6 mr-3 inline-flex" />
          <div>
            <span>{{ userName }}</span>
          </div>

          <template #dropdown>
            <nav-bar-item to="/profile">
              <nav-bar-item-label icon="account" label="My Profile"/>
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label icon="settings" label="Settings"/>
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label icon="email" label="Messages"/>
            </nav-bar-item>
            <hr />
            <nav-bar-item>
              <nav-bar-item-label icon="logout" label="Log Out"/>
            </nav-bar-item>
          </template>
        </nav-bar-menu>
        <nav-bar-item href="https://justboil.me/tailwind-admin-templates" :has-divider="true" :is-desktop-icon-only="true">
          <nav-bar-item-label icon="help-circle-outline" label="About" :is-desktop-icon-only="true" />
        </nav-bar-item>

        <nav-bar-item :is-desktop-icon-only="true">
          <nav-bar-item-label icon="logout" label="Log out" :is-desktop-icon-only="true" />
        </nav-bar-item>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import NavBarItem from '@/components/NavBarItem'
import NavBarItemLabel from '@/components/NavBarItemLabel'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'
import Icon from '@/components/Icon'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
    NavBarItem,
    NavBarItemLabel,
    Icon
  },
  setup () {
    const store = useStore()

    const isNavBarVisible = computed(() => !store.state.isFormScreen)

    const isAsideMobileExpanded = computed(() => store.state.isAsideMobileExpanded)

    const userName = computed(() => store.state.userName)

    const menuToggleMobileIcon = computed(() => isAsideMobileExpanded.value ? 'backburger' : 'forwardburger')

    const menuToggleMobile = () => store.dispatch('asideMobileToggle')

    const isMenuNavBarActive = ref(false)

    const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? 'close' : 'dots-vertical')

    const menuNavBarToggle = () => {
      isMenuNavBarActive.value = !isMenuNavBarActive.value
    }

    return {
      isNavBarVisible,
      isAsideMobileExpanded,
      userName,
      menuToggleMobileIcon,
      menuToggleMobile,
      isMenuNavBarActive,
      menuNavBarToggleIcon,
      menuNavBarToggle
    }
  }
}
</script>
