<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'

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
  <OverlayLayer :is-active="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="z-50 max-h-[calc(100dvh-(--spacing(40)))] w-11/12 shadow-lg md:w-3/5 lg:w-2/5 xl:w-4/12"
      is-modal
    >
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

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton :label="buttonLabel" :color="button" @click="confirm" />
          <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
