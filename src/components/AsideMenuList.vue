<template>
  <ul>
    <aside-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-submenu-list="isSubmenuList"
      @menu-click="menuClick"
    />
  </ul>
</template>

<script>
import AsideMenuItem from '@/components/AsideMenuItem.vue'

export default {
  name: 'AsideMenuList',
  components: {
    AsideMenuItem
  },
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  emits: ['menu-click'],
  setup (props, { emit }) {
    const menuClick = (event, item) => {
      emit('menu-click', event, item)
    }

    return {
      menuClick
    }
  }
}
</script>
