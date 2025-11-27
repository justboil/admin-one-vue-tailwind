<script setup>
import { computed } from 'vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'checkbox',
    validator: (value) => ['checkbox', 'radio', 'switch'].includes(value),
  },
  componentClass: String,
  isColumn: Boolean,
  modelValue: [Array, String, Number, Boolean],
})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="-mb-3 flex flex-wrap justify-start" :class="{ 'flex-col': isColumn }">
    <FormCheckRadio
      v-for="(value, key) in options"
      :key="key"
      v-model="computedValue"
      :type="type"
      :name="name"
      :input-value="key"
      :label="value"
      :class="componentClass"
      class="mr-6 mb-3 last:mr-0"
    />
  </div>
</template>
