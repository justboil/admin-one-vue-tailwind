<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  api: {
    type: String,
    default: "avataaars",
  },
});

const avatar = computed(
  () =>
    props.avatar ??
    `https://avatars.dicebear.com/api/${props.api}/${props.username.replace(
      /[^a-z0-9]+/i,
      "-"
    )}.svg`
);

const username = computed(() => props.username);
</script>

<template>
  <div>
    <img
      :src="avatar"
      :alt="username"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
