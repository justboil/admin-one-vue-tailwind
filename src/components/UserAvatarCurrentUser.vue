<template>
  <UserAvatar
    :username="username"
    :avatar="avatar"
  />
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  components : {
    UserAvatar
  },
  props : {
    username : {
      default : "999",
      type : String
    },
    avatar : {
      default : null,
      type : String,
    }
  }
}

</script>

