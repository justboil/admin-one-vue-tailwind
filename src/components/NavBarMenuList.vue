<script setup>
import NavBarItem from "@/components/NavBarItem.vue";

defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["menu-click"]);

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};
</script>

<template>
  <NavBarItem
    v-for="(item, index) in menu"
    :key="index"
    :item="item"
    @menu-click="menuClick"
  />
</template>
