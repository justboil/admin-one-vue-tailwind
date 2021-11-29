<template>
  <component
    :is="type"
    class="checkbox-cell"
  >
    <label class="checkbox">
      <input
        v-model="checked"
        type="checkbox"
      >
      <span class="check" />
    </label>
  </component>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'CheckboxCell',
  props: {
    type: {
      type: String,
      default: 'td'
    }
  },
  emits: ['checked'],
  setup (props, { emit }) {
    const checked = ref(false)

    watch(checked, newVal => {
      emit('checked', newVal)
    })

    return { checked }
  }
}
</script>
