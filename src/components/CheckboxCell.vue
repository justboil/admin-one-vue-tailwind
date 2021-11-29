<script setup>
import { ref, watch } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'td'
  }
})

const emit = defineEmits(['checked'])

const checked = ref(false)

watch(checked, newVal => {
  emit('checked', newVal)
})
</script>

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
