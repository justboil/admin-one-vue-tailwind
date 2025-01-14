<script setup>
import { FormKit } from '@formkit/vue'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  analitic: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])
const localAnalitic = ref({ ...props.analitic })

const ORGANOLEPTICO_INCORRECTO = 0
const ORGANOLEPTICO_CORRECTO = 1
// Computed properties para valores organolépticos
const olorValue = computed({
  get: () => +localAnalitic.value.olor === ORGANOLEPTICO_INCORRECTO,
  set: (checked) => {
    localAnalitic.value.olor = checked ? ORGANOLEPTICO_INCORRECTO : ORGANOLEPTICO_CORRECTO
    // emit('update', localAnalitic.value)
  }
})

const colorValue = computed({
  get: () => +localAnalitic.value.color === ORGANOLEPTICO_INCORRECTO,
  set: (checked) => (localAnalitic.value.color = checked ? 0 : 1)
})

const saborValue = computed({
  get: () => +localAnalitic.value.sabor === 0,
  set: (checked) => (localAnalitic.value.sabor = checked ? 0 : 1)
})

watch(
  () => props.analitic,
  (newVal) => {
    localAnalitic.value = { ...newVal }
  },
  { immediate: true }
)

watch(
  localAnalitic,
  (newVal) => {
    emit('update', newVal)
  },
  { deep: true }
)

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     if (!newVal) {
//        localAnalitic.value = { ...props.analitic }
//       emit('update', null)
//     }
//   }
// )
// watch(() => localAnalitic, (newVal) => {
//         // <div v-if="localAnalitic.value.type === 29">
// });
</script>

<template>
  <div v-if="localAnalitic.type">
    <div v-if="localAnalitic.type === 29">
      <h2 class="font-bold text-xl mb-3 mt-3 text-gray-600 flex justify-center">
        Caracteristicas Organolépticas
      </h2>
      <div class="border border-gray-300 p-4 rounded-md mb-6 flex flex-col items-center">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormKit
            v-model="olorValue"
            type="checkbox"
            label="Olor"
            help="Marca si el agua tiene mal olor"
            name="olor"
            validation-visibility="dirty"
          />
          <FormKit
            v-model="colorValue"
            type="checkbox"
            label="Color"
            help="Marca si el agua tiene mal color"
            name="color"
            validation-visibility="dirty"
          />
          <FormKit
            v-model="saborValue"
            type="checkbox"
            label="Sabor"
            help="Marca si el agua tiene mal sabor"
            name="sabor"
            validation-visibility="dirty"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <FormKit
        v-model.number="localAnalitic.cloro"
        type="number"
        placeholder="Cloro Residual"
        label="Cloro Residual"
        help="mg/l"
        validation="number|min:0|max:99"
        :validation-messages="{ number: 'Introduce un número', min: 'El valor mínimo es 0', max: 'El valor máximo es 99' }"

      ></FormKit>
      <FormKit
        v-model="localAnalitic.ph"
        type="number"
        placeholder="pH"
        label="pH"
        help="ud"
        validation="number|min:0|max:14"
        :validation-messages="{ number: 'Introduce un número', min: 'El valor mínimo es 0', max: 'El valor máximo es 14' }"

      />
      <FormKit
        v-model.number="localAnalitic.turbidez"
        type="number"
        placeholder="Turbidez"
        label="Turbidez"
        help="UNF"
        validation="number|min:0|max:999"
        :validation-messages="{ number: 'Introduce un número', min: 'El valor mínimo es 0', max: 'El valor máximo es 999' }"

      />
    </div>
    <div>
      <FormKit
        v-model="localAnalitic.observaciones"
        type="textarea"
        placeholder="Introduce cualquier tipo de incidencia"
        inner-class="w-full"
        wrapper-class="w-full"
      />
    </div>
  </div>
</template>
