<script setup>
defineProps({
  custom: Boolean,
  first: Boolean,
  last: Boolean,
})
</script>

<template>
  <section
    class="px-6 py-24 text-center lg:mx-auto lg:max-w-2xl lg:px-0"
    :class="{ '-mb-6': first, '-mt-6': last, '-my-6': !first && !last }"
  >
    <slot v-if="custom" />
    <h1 v-else class="text-2xl text-gray-500 dark:text-slate-400">
      <slot />
    </h1>
  </section>
</template>
