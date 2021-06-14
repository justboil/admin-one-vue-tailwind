<template>
  <div class="flex flex-row w-full bg-gray-900 text-white flex-1 px-3 h-14 items-center">
    <div>
      <slot name="label" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideTools',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  }
}
</script>
