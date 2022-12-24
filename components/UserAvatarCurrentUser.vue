<script setup>
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
</script>

<template>
  <UserAvatar :username="mainStore.userName" :avatar="mainStore.userAvatar">
    <slot />
  </UserAvatar>
</template>
