<template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component
      v-show="value"
      :title="title"
      class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50"
      :header-icon="mdiClose"
      @header-icon-click="cancel"
    >
      <div class="space-y-3">
        <h1 v-if="largeTitle" class="text-2xl">{{ largeTitle }}</h1>
        <slot />
      </div>

      <divider />

      <jb-buttons>
        <jb-button :label="buttonLabel" :color="button" @click="confirm" />
        <jb-button v-if="hasCancel" label="Cancel" @click="cancel" :color="button" outline />
      </jb-buttons>
    </card-component>
  </overlay>
</template>

<script>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'
import CardComponent from '@/components/CardComponent'
import Divider from '@/components/Divider'
import Overlay from '@/components/Overlay'

export default {
  name: 'ModalBox',
  components: {
    Overlay,
    JbButton,
    JbButtons,
    CardComponent,
    Divider
  },
  props: {
    title: String,
    largeTitle: String,
    button: {
      type: String,
      default: 'info'
    },
    buttonLabel: {
      type: String,
      default: 'Done'
    },
    hasCancel: Boolean,
    modelValue: [String, Number, Boolean]
  },
  emits: ['update:modelValue', 'cancel', 'confirm'],
  setup (props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    const confirmCancel = mode => {
      value.value = false
      emit(mode)
    }

    const confirm = () => confirmCancel('confirm')

    const cancel = () => confirmCancel('cancel')

    return {
      value,
      confirm,
      cancel,
      mdiClose
    }
  }
}
</script>
