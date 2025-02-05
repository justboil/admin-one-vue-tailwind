<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  api: {
    type: String,
    // default: 'avataaars'
    default:'big-smile'
  }
})

// const avatar = computed(
//   () =>
//     props.avatar ??
//     `https://api.dicebear.com/9.x/${props.api}/svg?seed=${props.username.replace(
//       /[^a-z0-9]+/gi,
//       '-'
//     )}.svg`
// )

const avatar = computed(
    () =>props.avatar ??
      `https://ui-avatars.com/api/?name=${props.username}&background=random&font-size=0.75&bold=true&color=fff&rounded=false&size=512`
  )
const username = computed(() => props.username)
</script>

<template>
  <div>
    <img
      :src="avatar"
      :alt="username"
      class="rounded block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
