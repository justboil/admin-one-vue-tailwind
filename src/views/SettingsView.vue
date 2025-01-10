<script setup>

import {useLoginStore} from '@/stores/login';

const loginStore = useLoginStore();


</script>


<template>
    <div>

<h1>Panel de control</h1>
<img 
       
      :src="loginStore.userAvatar" 
      class="rounded-full h-8 w-8"
      alt="Foto de perfil"
    />



    </div>
</template>


<style scoped>









</style>