<template>
  <component :is="type" class="checkbox-cell">
    <label class="checkbox">
      <input type="checkbox" v-model="checked">
      <span class="check"></span>
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
  setup (props, { emit }) {
    const checked = ref(false)

    watch(checked, newVal => {
      emit('checked', newVal)
    })

    return { checked }
  }
}
</script>
