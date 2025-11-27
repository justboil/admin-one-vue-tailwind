<script setup>
import { useDarkModeStore } from '@/stores/darkMode'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'checkbox',
    validator: (value) => ['checkbox', 'radio', 'switch'].includes(value),
  },
  label: String,
  modelValue: [Array, String, Number, Boolean],
  inputValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.inputValue)
  }

  return props.modelValue === props.inputValue
})

const inputType = computed(() => (props.type === 'radio' ? 'radio' : 'checkbox'))

const darkModeStore = useDarkModeStore()
</script>

<template>
  <label
    class="relative inline-flex cursor-pointer items-center jb-custom-check"
    :class="{ 'cursor-not-allowed': disabled }"
  >
    <input
      v-model="computedValue"
      :type="inputType"
      :name="name"
      :value="inputValue"
      :disabled="disabled"
      class="absolute left-0 -z-1 opacity-0"
    />
    <span
      class="jb-check border"
      :class="{
        'transition-colors duration-200': !darkModeStore.isInProgress,
        'block size-5': ['radio', 'checkbox'].includes(type),
        'rounded-sm': type === 'checkbox',
        'rounded-full': ['radio', 'switch'].includes(type),
        'flex h-6 w-12 shrink-0 items-center p-0.5': type === 'switch',
        'bg-gray-200': type === 'switch' && !isChecked,
        'border-4 bg-center bg-no-repeat': ['radio', 'checkbox'].includes(type) && isChecked,
        'bg-(image:--checkbox-checked)': type === 'checkbox' && isChecked,
        'bg-(image:--radio-checked)': type === 'radio' && isChecked,
        'border-blue-600 bg-blue-600': isChecked,
        'border-gray-700 dark:bg-slate-800': !isChecked,
      }"
    >
      <span
        v-if="type === 'switch'"
        class="block h-5 w-5 rounded-full border bg-white"
        :class="{
          'transform-(--switch-checked) border-blue-600': isChecked,
          'border-gray-700': !isChecked,
        }"
      />
    </span>
    <span class="pl-2">{{ label }}</span>
  </label>
</template>
