<script setup>
const props = defineProps({
  navBar: Boolean,
})
</script>

<template>
  <hr
    :class="
      props.navBar
        ? 'hidden lg:my-0.5 lg:block dark:border-slate-700'
        : '-mx-6 my-6 dark:border-slate-800'
    "
    class="border-t border-gray-100"
  />
</template>
