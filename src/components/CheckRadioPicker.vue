<template>
  <field grouped multiline :spaced="spaced">
    <control v-for="(value, key) in options" :key="key">
      <label :class="type">
        <input
          :type="inputType"
          :name="name"
          v-model="computedValue"
          :value="key">
        <span class="check"></span>
        <span class="control-label">{{ value }}</span>
      </label>
    </control>
  </field>
</template>

<script>
import { computed } from 'vue'
import Field from '@/components/Field'
import Control from '@/components/Control'

export default {
  name: 'CheckRadioPicker',
  components: {
    Field,
    Control
  },
  props: {
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
    spaced: {
      type: Boolean,
      default: false
    },
    modelValue: [String, Number, Boolean, Array],
    nativeValue: [String, Number, Boolean, Array]
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })

    const inputType = computed(() => props.type === 'radio' ? 'radio' : 'checkbox')

    return {
      computedValue,
      inputType
    }
  }
}
</script>
