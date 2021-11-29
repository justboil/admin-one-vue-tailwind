<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'checkbox'
  },
  column: Boolean,
  modelValue: {
    type: [Object, Array, String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

const inputType = computed(() => props.type === 'radio' ? 'radio' : 'checkbox')
</script>

<template>
  <div
    class="flex justify-start flex-wrap -mb-3"
    :class="{'flex-col':column}"
  >
    <label
      v-for="(value, key) in options"
      :key="key"
      :class="type"
      class="mr-6 mb-3 last:mr-0"
    >
      <input
        v-model="computedValue"
        :type="inputType"
        :name="name"
        :value="key"
      >
      <span class="check" />
      <span class="control-label">{{ value }}</span>
    </label>
  </div>
</template>
