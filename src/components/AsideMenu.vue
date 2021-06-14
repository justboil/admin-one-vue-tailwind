<template>
  <aside
    v-show="isAsideVisible"
    class="w-60 fixed top-0 z-40 h-screen bg-gray-800 transition-all md:left-0"
    :class="{ '-left-60': !isAsideMobileExpanded, 'left-0': isAsideMobileExpanded }"
  >
    <aside-tools :is-main-menu="true">
      <template #label>
        Admin <b class="font-black">One</b>
      </template>
    </aside-tools>
    <div>
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="`a-${index}`" class="p-3 text-xs uppercase text-gray-400">
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="`b-${index}`"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const store = useStore()

    const isAsideVisible = computed(() => !store.state.isFormScreen)

    const isAsideMobileExpanded = computed(() => store.state.isAsideMobileExpanded)

    const menuClick = (event, item) => {
      if (item.prevent) {
        event.preventDefault()
        alert('Coming soon')
      }

      console.log('menuClick', item)
    }

    return {
      isAsideVisible,
      isAsideMobileExpanded,
      menuClick
    }
  }
}
</script>
