<template>
  <div class="relative">
    <select
      v-if="computedType === 'select'"
      v-model="computedValue"
      :name="name"
      :id="id"
      :class="inputElClass">
      <option v-for="option in options" :key="option.id ?? option" :value="option">{{ option.label ?? option }}</option>
    </select>
    <textarea
      v-else-if="computedType === 'textarea'"
      v-model="computedValue"
      :class="inputElClass"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :required="required"
    ></textarea>
    <input
      v-else
      ref="inputEl"
      v-model="computedValue"
      :name="name"
      :autocomplete="autocomplete"
      :required="required"
      :id="id"
      :placeholder="placeholder"
      :type="computedType"
      :class="inputElClass"
    >
    <control-icon
      v-if="icon"
      :icon="icon"
      :h="controlIconH"
    />
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import ControlIcon from '@/components/ControlIcon'

export default {
  name: 'Control',
  components: {
    ControlIcon
  },
  props: {
    name: String,
    id: String,
    required: Boolean,
    autocomplete: String,
    placeholder: String,
    icon: String,
    options: Array,
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: ''
    },
    borderless: Boolean,
    transparent: Boolean,
    ctrlKFocus: Boolean
  },
  emits: ['update:modelValue', 'right-icon-click'],
  setup (props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value)
      }
    })

    const inputElClass = computed(() => {
      const base = [
        'px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full',
        'dark:placeholder-gray-400',
        computedType.value === 'textarea' ? 'h-24' : 'h-12',
        props.borderless ? 'border-0' : 'border',
        props.transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-800'
      ]

      if (props.icon) {
        base.push('pl-10')
      }

      return base
    })

    const computedType = computed(() => props.options ? 'select' : props.type)

    const controlIconH = computed(() => props.type === 'textarea' ? 'h-full' : 'h-12')

    const store = useStore()

    const inputEl = ref(null)

    if (props.ctrlKFocus) {
      const fieldFocusHook = e => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault()
          inputEl.value.focus()
        } else if (e.key === 'Escape') {
          inputEl.value.blur()
        }
      }

      onMounted(() => {
        if (!store.state.isFieldFocusRegistered) {
          window.addEventListener('keydown', fieldFocusHook)

          store.commit('basic', {
            key: 'isFieldFocusRegistered',
            value: true
          })
        } else {
          console.error('Duplicate field focus event')
        }
      })

      onBeforeUnmount(() => {
        window.removeEventListener('keydown', fieldFocusHook)

        store.commit('basic', {
          key: 'isFieldFocusRegistered',
          value: false
        })
      })
    }

    return {
      computedValue,
      inputElClass,
      computedType,
      controlIconH,
      inputEl
    }
  }
}
</script>
