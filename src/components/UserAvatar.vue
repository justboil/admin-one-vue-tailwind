<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    default: null
  },
  api: {
    type: String,
    default: 'api/avataaars'
  }
})

const store = useStore()

const lightBgStyle = computed(() => store.state.lightBgStyle)

const avatar = computed(() => props.username
  ? `https://avatars.dicebear.com/${props.api}/${props.username.replace(/[^a-z0-9]+/i, '-')}.svg`
  : store.state.userAvatar)

const name = computed(() => props.username ? props.username : store.state.userName)
</script>

<template>
  <div>
    <img
      :src="avatar"
      :alt="name"
      class="rounded-full block h-auto w-full max-w-full dark:bg-gray-800"
      :class="lightBgStyle"
    >
  </div>
</template>
