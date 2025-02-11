<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { usePlantasStore } from './stores/plantas'

const plantasStore=usePlantasStore()

onMounted(async () => {
  await plantasStore.initializeStore()
})



</script>

<template>
  <RouterView />
</template>
