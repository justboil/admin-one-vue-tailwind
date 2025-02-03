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

// const zonasUoOperario = ref([]);

// const emits = defineEmits(['cancelModal', 'closeModal'])

const plantasStore = usePlantasStore()

const props = defineProps({
  client: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// console.log('client: ', props.client)

const form = reactive({
  name: props.client?.name,
  // surname: props.client?.surname,
  email: props.client?.email,
  phone: props.client?.phone,
  id_zona: props.client?.id_zona,
  ud_operativa_fk: props.client?.ud_operativa_fk || 1,
  type: props.client?.type || 4,
  id: props.client?.id,
  zonas: [],
  color: '',
  olor: [],
  sabor: '',
  tipo: '',
  prueba: '5'
})

// console.log('form: ', form)

const returnTipoOperario = (tipoId) => {
  return plantasStore.getTipoPersonal.find((tipo) => tipo.id === tipoId)
}

const submitHandler = () => {
  // Validar formulario
  if (!form.name || !form.email || !form.ud_operativa_fk || !form.type) {
    console.error('Faltan campos requeridos')
    return false
  }

  const operarioData = {
    name: form.name,
    email: form.email,
    ud_operativa_fk: form.ud_operativa_fk,
    type: form.type,
    zonas: form.zonas,
    phone: form.phone
  }
  return operarioData
}

defineExpose({
  submitHandler
})

watch(
  () => props.client,
  (newClient) => {
    form.name = newClient?.name
    // form.surname = newClient.surname
    form.email = newClient?.email
    form.phone = newClient?.phone
    form.id_zona = newClient?.id_zona
    form.type = newClient?.type
    form.ud_operativa_fk = newClient?.ud_operativa_fk
    // form.type_bak = newClient.type_bak
    zonasOperarioSeleccionadas(newClient?.id)
  },
  { inmediate: true }
)
// const cancelModal = () => {
//   form.name = ''
//   form.surname = ''
//   form.email = ''
//   form.phone = ''
//   form.id_zona = ''
//   form.type = ''
//   form.ud_operativa_fk = ''
//   form.zonas = []
//   // form.type_bak = ''
//   zonasOperarioSeleccionadas(form.name)
//   emits('cancelModal')
// }

// const selectZona = computed(() => {
//   return plantasStore.getZonas.map((zona) => {
//     return { value: zona.id, label: zona.name }
//   })
// })

const selectUO = computed(() => {
  return plantasStore.getUnidadesOperativas.map((uo) => {
    return { value: uo.id, label: uo.name }
  })
})

// const zonasOperario = computed(() => {
//   return plantasStore.getZonas.filter(
//     (zona) => zona.id_unidades_operativas_fk === form.unidad_operativa
//   )
// })
// const isChecked = (zonaId) => {
//   return form.zonas.some(z => z.id === zonaId)
// }

const buscaZonasUO = (uo) => {
  // zonasUoOperario = plantasStore.getZonas.filter((zona) => zona.id_unidades_operativas_fk === uo)
  if (!uo) {
    console.warn('El valor de unidad operativa es undefined o null')
    return []
  }
  return plantasStore.getZonas
    .filter((zona) => zona.unidades_operativas_fk === uo)
    .map((zona) => {
      // return { id: zona.id, name: zona.name }
      return { value: zona.id, label: zona.name }
    })
}

const zonasOperarioSeleccionadas = async (id) => {

  if(!id) {
    console.warn('El valor de id es undefined o null')
    return []
  }
  const zonas = await searchZonasOperarios(id)
  // console.log('zonas: ', zonas)
  form.zonas = zonas.flatMap((zona) =>
    zona.zonas_personal.map((zone) => zone.zonas_abastecimiento.id)
  )

  // return{id:id,name:name}

  // console.log('Form.zonas ', form.zonas)
  //  return zones

  // return searchZonasOperarios(nombre).map((zona) => { return { id: zona.zonas_personal.zonas_abastecimiento.id, name: zona.zonas_personal.zonas_abastecimiento.name } })
}
zonasOperarioSeleccionadas(form.id)
</script>

<template>
  <SectionMain>
    <!-- <CardBox form @submit.prevent="submit"> -->
    <CardBox>
      <form @submit.prevent="submitHandler">
        <div class="grid md-grid-cols-1 md:grid-cols-1 w-full mb-6">
          <FormKit
            v-model="form.name"
            type="text"
            label="Nombre"
            placeholder="Nombre"
            validation="required"
            class="w-full"
          />
        </div>

        <div class="grid md-grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormKit
            v-model="form.email"
            type="email"
            label="e-mail"
            placeholder="e-mail"
            validation="required"
            class="w-full"
          />
          <FormKit
            v-model="form.phone"
            type="number"
            label="phone"
            placeholder="phone"
            validation="required"
            class="w-full"
          />
        </div>

        <div class="grid md-grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FormKit
            v-model="form.ud_operativa_fk"
            type="select"
            label="Unidad Operativa"
            validation="required"
            class="w-full"
            :options="selectUO"
          />

          <FormKit
            v-model="form.type"
            :value="returnTipoOperario(form.type)"
            :options="
              plantasStore.getTipoPersonal.map((tipo) => ({ value: tipo.id, label: tipo.tipo }))
            "
            type="select"
            label="Tipo"
            validation="required"
            class="w-full"
          />
        </div>

        <div class="grid md-grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div class="w-full">
            <FormKit
              v-model="form.zonas"
              :options="buscaZonasUO(form.ud_operativa_fk)"
              type="checkbox"
              name="zonas"
              options-class="mb-4 flex jutify-between items-center space-x-2 p-10 rounded-md w-full"
              option-class="w-full"
            />
          </div>
        </div>
      </form>

      <template #footer>
        <!-- <BaseButtons>
                <BaseButton type="submit" color="info" label="Guardarrrr" @click="submitHandler" />
                <BaseButton type="reset" color="danger" outline label="Cancelar" @click="closeModal"/>
              </BaseButtons> -->
      </template>
    </CardBox>
  </SectionMain>
</template>
