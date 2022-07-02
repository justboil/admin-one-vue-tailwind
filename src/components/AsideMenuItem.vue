<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStyleStore } from '@/stores/style.js'
import { mdiMinus, mdiPlus } from '@mdi/js'
import BaseIcon from '@/components/BaseIcon.vue'
import AsideMenuList from '@/components/AsideMenuList.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isSubmenuList: Boolean
})

const emit = defineEmits(['menu-click'])

const styleStore = useStyleStore()

const isDropdownActive = ref(false)

const componentIs = computed(() => props.item.to ? RouterLink : 'a')

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
      :class="[ styleStore.asideMenuItemStyle, isSubmenuList ? 'p-3 text-sm' : 'py-2' ]"
      @click="menuClick"
    >
      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[ vSlot && vSlot.isExactActive ? styleStore.asideMenuItemActiveStyle : styleStore.asideMenuItemInactiveStyle ]"
        w="w-12"
      />
      <span
        class="grow"
        :class="[ vSlot && vSlot.isExactActive ? styleStore.asideMenuItemActiveStyle : styleStore.asideMenuItemInactiveStyle ]"
      >{{ item.label }}</span>
      <BaseIcon
        v-if="hasDropdown"
        :path="dropdownIcon"
        class="flex-none"
        :class="[ vSlot && vSlot.isExactActive ? styleStore.asideMenuItemActiveStyle : styleStore.asideMenuItemInactiveStyle ]"
        w="w-12"
      />
    </component>
    <AsideMenuList
      v-if="hasDropdown"
      :menu="item.menu"
      :class="[ styleStore.asideSubmenuListStyle, isDropdownActive ? 'block dark:bg-gray-800/50' : 'hidden' ]"
      is-submenu-list
    />
  </li>
</template>
