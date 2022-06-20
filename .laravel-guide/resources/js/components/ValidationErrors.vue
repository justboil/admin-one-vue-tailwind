<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import NotificationInCard from '@/components/NotificationInCard.vue'

const errors = computed(() => usePage().props.value.errors)

const hasErrors = computed(() => Object.keys(errors.value).length > 0)
</script>

<template>
  <NotificationInCard
    v-if="hasErrors"
    color="danger"
  >
    <b>Whoops! Something went wrong.</b>
    <span v-for="(error, key) in errors" :key="key">{{ error }}</span>
  </NotificationInCard>
</template>
