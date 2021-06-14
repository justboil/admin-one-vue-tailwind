<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="text-3xl font-semibold leading-tight">
            <slot />
          </h1>
        </div>
      </div>
      <div v-show="hasRightVisible" class="level-right">
        <div class="level-item">
          <slot name="right" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroBar',
  props: {
    hasRightVisible: {
      type: Boolean,
      default: true
    }
  }
}
</script>
