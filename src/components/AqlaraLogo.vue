<script setup>
import aqlaraLogo from '@/assets/logos/aqlara_logo.png'


defineProps({
  logo: {
    type: String,
    default: aqlaraLogo
  }
})

</script>

<template>
  
    <img :src="logo" width="250" height="150" viewBox="0 0 250 100" alt="aqlara-logo" />

  
</template>
