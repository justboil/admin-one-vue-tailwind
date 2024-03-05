<script setup>
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  isDropdownList: Boolean,
  menu: {
    type: Array,
    required: true
  },
})

const activeDropdownObject = ref({})

// testing of props passing and emiting:
function leaveOnlyTheActiveDropdownOpen(event, itemItself){
 
  console.log(itemItself.value)
  activeDropdownObject.value = itemItself.value

}

</script>

<template>
  <ul>
    <AsideMenuItem
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-dropdown-list="isDropdownList"
      @menu-click="leaveOnlyTheActiveDropdownOpen"

    />
  </ul>
</template>
