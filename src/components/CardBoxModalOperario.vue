<script setup>
import { computed, ref } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import FormOperario from './FormOperario.vue'
import { setOperarios } from '@/services/operarios'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Done'
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  client: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const formRef = ref(null)

const modalTitle = computed(() => {
  return props.client ? `${props.title} ${props.client.name}` : props.title
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

// const confirm = () => {
//   if (formRef.value) {
//     console.log('FORMREF',formRef.value);
//     const formData = formRef.value?.submitHandler()
//     console.log('FORMDATA',formData);
//     if (formData) {
//       emit('confirm', formData)
//       confirmCancel('confirm')
//       value.value = false
//     } else {
//       console.log('Form data is null')
//     }
//   }
// }
const confirm = async() => {
  const formData = formRef.value?.submitHandler()
  try {
    await setOperarios(formData);
    alert('Accion realizada con éxito');
    confirmCancel('confirm')
    
  } catch (error) {
    alert('Error al crear el operario');
    console.log('error',error);
  }
  
  // console.log(formRef.value?.submitHandler())
}

const cancel = () => confirmCancel('cancel')

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-4/5 xl:w-7/12 z-50"
      is-modal
    >
      <CardBoxComponentTitle :title="modalTitle">
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
        <!-- <slot @close-modal="cancel"/> -->
         <FormOperario ref="formRef" :client="client"/>
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
