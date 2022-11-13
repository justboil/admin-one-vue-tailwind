<script setup>
import UserAvatar from "@/components/UserAvatar.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
</script>

<template>
  <UserAvatar :username="userStore.userInfo.nickname" :avatar="userStore.userInfo.avatar">
    <slot />
  </UserAvatar>
</template>
