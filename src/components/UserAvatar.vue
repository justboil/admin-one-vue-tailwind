<template>
  <div>
    <img :src="newUserAvatar" :alt="userName" class="rounded-full block h-auto w-full max-w-full" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'UserAvatar',
  props: {
    avatar: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const store = useStore()

    const newUserAvatar = computed(() => {
      if (props.avatar) {
        return props.avatar
      }

      if (store.state.userAvatar) {
        return store.state.userAvatar
      }

      if (store.state.userName) {
        return `https://avatars.dicebear.com/v2/human/${store.state.userName.replace(/[^a-z0-9]+/i, '')}.svg?options[mood][]=happy`
      }

      return null
    })

    return {
      newUserAvatar,
      userName: computed(() => store.state.userName)
    }
  }
}
</script>
