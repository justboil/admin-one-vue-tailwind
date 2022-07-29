<script setup>
import { useMainStore } from '@/stores/main'
import UserAvatar from '@/components/UserAvatar.vue'

const mainStore = useMainStore()
</script>

<template>
  <UserAvatar
    :username="mainStore.currentUser.userInfo.nameHome"
    :avatar="mainStore.currentUser.avatar"
  />
</template>
