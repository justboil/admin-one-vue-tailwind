<script setup>
defineProps({
  custom: Boolean,
  first: Boolean,
  last: Boolean
})
</script>

<template>
  <section
    class="py-24 px-6 lg:px-0 lg:max-w-2xl lg:mx-auto text-center"
    :class="{ '-mb-6':first, '-mt-6':last, '-my-6':!first && !last }"
  >
    <slot v-if="custom" />
    <h1
      v-else
      class="text-2xl text-gray-500 dark:text-slate-400"
    >
      <slot />
    </h1>
  </section>
</template>
