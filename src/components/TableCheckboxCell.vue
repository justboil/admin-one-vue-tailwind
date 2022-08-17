<script setup>
import { ref, watch,computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'td'
  },
  isChecked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['checked'])

const checked = ref(props.isChecked)

watch(checked, newVal => {
  emit('checked', newVal)
})
</script>

<template>
  <component
    :is="props.type"
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
