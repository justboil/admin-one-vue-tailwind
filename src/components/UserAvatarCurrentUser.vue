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
      default : "123456",
      type : String
    },
    avatar : {
      default : null,
      type : String,
    }
  }
}

</script>

