<script setup>
import NotificationBar from '@/components/NotificationBar.vue';
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Something went wrong.',
  },
  errors: {
    type: Array,
    required: true,
  },
});
const uniqueErrors = computed(() => Array.from(new Set(props.errors)));
</script>

<template>
  <NotificationBar color="danger">
    <b>{{ title }}</b>
    <span v-for="(error, index) in uniqueErrors" :key="index">{{ error }}</span>
  </NotificationBar>
</template>
