<script setup>
import { computed } from 'vue';
import { COMUNIDADES_FLAGS } from '@/constants/flags';

const props = defineProps({
  comunidad: {
    type: Number,
    required: true
  }
});

const flagPath = computed(() => COMUNIDADES_FLAGS[props.comunidad] || '');
</script>

<template>
  <img 
    v-if="flagPath" 
    :src="flagPath" 
    class="w-6 h-6 mr-2"
    onerror="this.style.display='none'" 
    />
    <!-- :alt="COMUNIDADES_NAMES[comunidad]"  -->
</template>