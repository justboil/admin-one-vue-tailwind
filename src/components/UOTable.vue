<script setup>
import { computed } from 'vue';
import { usePlantasStore } from '@/stores/plantas';

const plantaStore = usePlantasStore()


const unidadesOperativas = computed(() => plantaStore.getUnidadesOperativas)
console.log('Unidades Operativas:', plantaStore.getUnidadesOperativas);



</script>


<template>
    <div>
      





    </div>
</template>


<style scoped>









</style>