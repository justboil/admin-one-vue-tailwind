<script setup>
defineProps({
  display: {
    type: String,
    default: 'flex',
  },
  useMargin: Boolean,
})
</script>

<template>
  <div
    :class="[display, useMargin ? 'mx-3 my-2' : 'px-3 py-2']"
    class="navbar-item-label cursor-pointer items-center dark:text-white dark:hover:text-slate-400"
  >
    <slot />
  </div>
</template>
