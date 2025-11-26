<script setup>
import UserAvatar from '@/components/UserAvatar.vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();
</script>

<template>
  <UserAvatar :username="page.props.auth.user.name">
    <slot />
  </UserAvatar>
</template>
