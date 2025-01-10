<script setup>
// import { useMainStore } from '@/stores/main'
import UserAvatar from '@/components/UserAvatar.vue'
import {useLoginStore} from '@/stores/login';

// const mainStore = useMainStore()
const loginStore = useLoginStore()
</script>

<template>
  <UserAvatar :username="loginStore.userName" :avatar="loginStore.userAvatar">
    <slot />
  </UserAvatar>
</template>
