<template>
  <div class="flex items-center flex-col justify-center overflow-hidden fixed inset-0" :class="zIndex">
    <div class="absolute inset-0 bg-gradient-to-tr from-gray-700 via-gray-900 to-gray-700 opacity-90" @click="overlayClick"></div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  emits: ['overlay-click'],
  props: {
    zIndex: {
      type: String,
      default: 'z-50'
    }
  },
  setup (props, { emit }) {
    const overlayClick = event => {
      emit('overlay-click', event)
    }

    return {
      overlayClick
    }
  }
}
</script>
