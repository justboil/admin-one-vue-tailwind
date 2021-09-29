<template>
  <div>
    <img :src="avatar" :alt="name" class="rounded-full block h-auto w-full max-w-full" :class="bg" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'UserAvatar',
  props: {
    username: String,
    bg: {
      type: String,
      default: 'bg-gray-100 dark:bg-gray-800'
    },
    api: {
      type: String,
      default: 'api/avataaars'
    }
  },
  setup (props) {
    const store = useStore()

    const avatar = computed(() => props.username
      ? `https://avatars.dicebear.com/${props.api}/${props.username.replace(/[^a-z0-9]+/i, '-')}.svg`
      : store.state.userAvatar)

    const name = computed(() => props.username ? props.username : store.state.userName)

    return {
      name,
      avatar
    }
  }
}
</script>
