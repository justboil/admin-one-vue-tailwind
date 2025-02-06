<script setup>
import { computed, reactive, ref, toValue, watch } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
// import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
// import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import { usePlantasStore } from '@/stores/plantas'
import { searchZonasOperarios } from '@/services/supabase'
import { setOperarios } from '@/services/operarios'
import OperariosView from '@/views/OperariosView.vue'
import { FormKit } from '@formkit/vue'

// const zonasUoOperario = ref([]);

// const emits = defineEmits(['cancelModal', 'closeModal'])

const emit=defineEmits(['submit', 'closeModal'])

const plantasStore = usePlantasStore()

const props = defineProps({
  uo: {
    type: Object,
    required: true,
    default: () => ({})
  }
})


const form = reactive({
  id: props.uo?.id,
  name: props.uo?.name,
  description: props.uo?.description,
  zonas: []
})



const submitHandler = () => {
  console.log('submitHandler')
  // Validar formulario
  if (!form.name || !form.description) {
    console.error('Faltan campos requeridos')
    return false
  }
  
  const uoData = {
    id: form.id,
    name: form.name,
    description: form.description,
    zonas: form.zonas
  }
  emit('submit', uoData)
  // return uoData
}



const selectComunidadAutonoma = computed(() => {
  return plantasStore.getComunidadesAutonomas.map((ca) => {
    return { value: ca.id, label: ca.name }
  })
})

const zonasPorComunidadAutonoma = (ca) => {
  const comAut = plantasStore.getZonas
    .filter((zona) => zona.com_autonoma_fk === ca)
    .map((zona) => {
      return { value: zona.id, label: zona.name }
    })
  // console.log('comAut: ', comAut)
  return comAut
}

const getZonas = computed(() => {
  const zonas = plantasStore.getZonas.map((zona) => {
    return { value: zona.id, label: zona.name }
  })
  console.log('ZONAS: ', zonas)
  return zonas
})


watch(
  () => props.uo,
  (newUO) => {
    form.id = newUO?.id
    form.name = newUO?.name
    form.description = newUO?.description
    zonasUOSeleccionadas(newUO?.id)
  },
  { inmediate: true }
)

const zonasUOSeleccionadas = async (id) => {
  if (!id) {
    console.warn('El valor de id es undefined o null')
    return []
  }

  const zonas = plantasStore.getZonas
    .filter((zona) => zona.unidades_operativas_fk === id)
    .map((zona) => {
      return zona.id
    })
  console.log('ZONAS SELECCIONADAS: ', zonas)
  form.zonas = zonas
}

zonasUOSeleccionadas(form.id)

defineExpose({
  submitHandler
})
</script>

<template>
  <SectionMain>
    <!-- <CardBox form @submit.prevent="submit"> -->
    <CardBox is-form>
      <form class="w-full" @submit.prevent="submitHandler">
        <div class="grid grid-cols-1 lg:grid-cols-6 mb-6 gap-4 w-full">
          <div class="col-span-1 w-full">
            <FormKit
              v-model="form.name"
              type="text"
              label="Código"
              placeholder="Código"
              validation="required"
              class="col-span-1 w-full"
            />
          </div>
          <div class="col-span-5 w-full">
            <FormKit
              v-model="form.description"
              type="text"
              label="Nombre"
              placeholder="Nombre"
              validation="required"
              class="col-span-3 w-full"
            />
          </div>
        </div>

        <FormKit
          v-model="form.comunidadAutonoma"
          :options="selectComunidadAutonoma"
          type="select"
          label="Comunidad Autonoma"
          placeholder="Comunidad Autonoma"
          class="w-full"
          option-class="w-full"
          
        />

        <!-- <div v-if="form.comunidadAutonoma" class="grid md-grid-cols-1 md:grid-cols-4 gap-4 mb-6"> -->
        <!-- <div class="w-full" v-for="zona in zonasPorComunidadAutonoma(form.comunidadAutonoma)" :key="zona.id"> -->

        <div v-if="form.comunidadAutonoma" class="grid md-grid-cols-1 md:grid-cols-1 gap-4 mb-6">
          <FormKit
            v-model="form.zonas"
            :options="form.comunidadAutonoma?zonasPorComunidadAutonoma(form.comunidadAutonoma):getZonas"
            label="Zonas"
            type="checkbox"
            name="zonas"
            options-class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 space-y-2 p-4 rounded-md"
            option-class="flex items-center"
          />
        </div>
        <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->
      </form>
      <template #footer>
        <BaseButtons>
                <BaseButton type="submit" color="info" label="Guardar" @click="emit('submit', form)" />
                <BaseButton type="reset" color="danger" outline label="Cancelar" @click="emit('closeModal')"/>
              </BaseButtons>
      </template>

    </CardBox>
  </SectionMain>
</template>
