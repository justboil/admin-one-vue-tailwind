<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiMinus, mdiPlus } from '@mdi/js'
import Icon from '@/components/Icon.vue'
import AsideMenuList from '@/components/AsideMenuList.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isSubmenuList: Boolean
})

const emit = defineEmits(['menu-click'])

const mainStore = useMainStore()

const asideMenuItemStyle = computed(() => mainStore.asideMenuItemStyle)

const asideMenuItemActiveStyle = computed(() => mainStore.asideMenuItemActiveStyle)

const asideMenuItemInactiveStyle = computed(() => mainStore.asideMenuItemInactiveStyle)

const asideSubmenuListStyle = computed(() => mainStore.asideSubmenuListStyle)

const isDropdownActive = ref(false)

const componentIs = computed(() => props.item.to ? 'router-link' : 'a')

const hasDropdown = computed(() => !!props.item.menu)

const dropdownIcon = computed(() => isDropdownActive.value ? mdiMinus : mdiPlus)

const itemTo = computed(() => props.item.to || null)

const itemHref = computed(() => props.item.href || null)

const itemTarget = computed(() => componentIs.value === 'a' && props.item.target ? props.item.target : null)

const menuClick = event => {
  emit('menu-click', event, props.item)

  if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value
  }
}
</script>

<template>
  <li>
    <component
      :is="componentIs"
      v-slot="vSlot"
      :to="itemTo"
      :href="itemHref"
      :target="itemTarget"
      class="flex cursor-pointer dark:hover:bg-gray-700/50"
      :class="[ asideMenuItemStyle, isSubmenuList ? 'p-3 text-sm' : 'py-2' ]"
      @click="menuClick"
    >
      <icon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[ vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : asideMenuItemInactiveStyle ]"
        w="w-12"
      />
      <span
        class="grow"
        :class="[ vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : asideMenuItemInactiveStyle ]"
      >{{ item.label }}</span>
      <icon
        v-if="hasDropdown"
        :path="dropdownIcon"
        class="flex-none"
        :class="[ vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : asideMenuItemInactiveStyle ]"
        w="w-12"
      />
    </component>
    <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :class="[ asideSubmenuListStyle, isDropdownActive ? 'block dark:bg-gray-800/50' : 'hidden' ]"
      is-submenu-list
    />
  </li>
</template>
