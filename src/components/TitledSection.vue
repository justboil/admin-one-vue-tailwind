<template>
  <section class="py-24 px-6 lg:px-0 lg:max-w-2xl lg:mx-auto text-center" :class="[ last ? '-mt-6' : '-mb-6']">
    <slot v-if="custom"/>
    <h1 v-else class="text-2xl text-gray-500">
      <slot />
    </h1>
  </section>
</template>

<script>
export default {
  name: 'TitledSection',
  props: {
    custom: Boolean,
    last: Boolean
  }
}
</script>
