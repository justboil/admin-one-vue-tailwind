<script setup>
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/main.js'

useMainStore().setUser({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
})
</script>

<template>
  <RouterView />
</template>
