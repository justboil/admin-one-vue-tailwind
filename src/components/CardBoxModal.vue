<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentBody from './CardBoxComponentBody.vue'
import CardBoxComponentFooter from './CardBoxComponentFooter.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: 'info',
  },
  buttonLabel: {
    type: String,
    default: 'Done',
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})
</script>

<template>
  <OverlayLayer v-if="value" @overlay-click="cancel">
    <CardBox
      class="z-50 max-h-[calc(100dvh-(--spacing(40)))] w-11/12 animate-fade-in shadow-lg md:w-3/5 lg:w-2/5 xl:w-4/12"
      is-modal
      has-component-layout
    >
      <div class="px-6 pt-6">
        <CardBoxComponentTitle :title="title">
          <BaseButton
            v-if="hasCancel"
            :icon="mdiClose"
            color="whiteDark"
            small
            rounded-full
            @click.prevent="cancel"
          />
        </CardBoxComponentTitle>
      </div>

      <CardBoxComponentBody class="mr-3 overflow-y-auto py-6 pr-3 pl-6" no-padding>
        <div class="space-y-3">
          <slot />
        </div>
      </CardBoxComponentBody>

      <CardBoxComponentFooter>
        <BaseButtons>
          <BaseButton :label="buttonLabel" :color="button" @click="confirm" />
          <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </CardBoxComponentFooter>
    </CardBox>
  </OverlayLayer>
</template>
