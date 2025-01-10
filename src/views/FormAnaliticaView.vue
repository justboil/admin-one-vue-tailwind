<script setup>
import { computed, onMounted } from 'vue'
import { mdiBallotOutline, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
// import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
// import FormFilePicker from '@/components/FormFilePicker.vue'
// import FormField from '@/components/FormField.vue'
// import FormControl from '@/components/FormControl.vue'
// import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
// import BaseButtons from '@/components/BaseButtons.vue'
// import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import useLoginStore from '@/stores/login'
// import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import { usePlantasStore } from '@/stores/plantas'
import { FormKit } from '@formkit/vue'
import { supabase } from '../services/supabase'

import useFormSelectData from '../composables/useFormSelectData'

const {
  form,
  selectZona,
  selectPuntosMuestra,
  selectInfraestructura,
  selectUO,
  operarioPorZona,
  findOperarioByUser,
  operarioLogueado
} = useFormSelectData()

const loginStore = useLoginStore()
const plantaStore = usePlantasStore()
const resetForm = () => {
  form.punto_muestreo_fk = ''
  form.fecha = ''
  form.color = 1
  form.olor = 1
  form.sabor = 1
  form.cloro = ''
  form.type = ''
  form.observaciones = ''
  form.operario = ''
  form.ph = ''
  form.turbidez = ''
  form.zona = ''
  form.infraestructura = ''
  form.uo = ''
  form.type = ''
}

// Computed properties para valores organolépticos
const olorValue = computed({
  get: () => form.olor === 0,
  set: (checked) => (form.olor = checked ? 0 : 1)
})

const colorValue = computed({
  get: () => form.color === 0,
  set: (checked) => (form.color = checked ? 0 : 1)
})

const saborValue = computed({
  get: () => form.sabor === 0,
  set: (checked) => (form.sabor = checked ? 0 : 1)
})

const recargaFormulario = () => {
  form.operario = loginStore.isAuthenticated ? operarioLogueado.value?.id : null
  form.uo = loginStore.isAuthenticated ? operarioLogueado.value?.ud_operativa_fk : null
}

const submitHandler = async () => {
  try {
    const { data, error } = await supabase.from('analiticas').insert([
      {
        punto_muestreo_fk: form.punto_muestreo_fk,
        fecha: form.fecha,
        color: form.color ? Number(form.color) : null,
        olor: form.olor,
        sabor: form.sabor,
        cloro: form.cloro ? Number(form.cloro) : null,
        type: form.type,
        observaciones: form.observaciones,
        personal_fk: form.operario,
        ph: form.ph ? Number(form.ph) : null,
        turbidez: form.turbidez ? Number(form.turbidez) : null,
        zona_fk: form.zona
      }      
    ])

    if (error) {
      console.error('Error al insertar datos:', error)
      alert('Error al insertar datos: ' + error.message)
    } else {
      plantaStore.loadAnaliticas()
      console.log('Datos insertados:', data)
      alert('Datos insertados correctamente')
      resetForm()
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    alert('Error en la solicitud: ' + error.message)
  } finally {
  recargaFormulario()
  }
}


//
onMounted(async() => {
  await plantaStore.loadOperarios()
  findOperarioByUser(loginStore.userEmail)
  form.operario = loginStore.isAuthenticated ? operarioLogueado.value?.id : null
  form.uo = loginStore.isAuthenticated ? operarioLogueado.value?.ud_operativa_fk : null
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Formulario de Analítica" main>
        <BaseButton
          href="https://www.aqlara.com"
          target="_blank"
          :icon="mdiMail"
          label="Aqlara"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox>
        <FormKit type="form" submit-label="Enviar" @submit="submitHandler">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormKit
              v-model.number="form.operario"
              type="select"
              :options="operarioPorZona"
              placeholder="Operario"
              disabled="loginStore.userLogged?true:false"
            />
            <FormKit
              v-model="form.fecha"
              type="date"
              placeholder="Fecha de la toma de la muestra"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormKit
              v-model="form.uo"
              type="select"
              :options="selectUO"
              placeholder="Unidad Operativa"
              label="Unidad Operativa"
            />
            <FormKit
              v-model="form.zona"
              type="select"
              :options="form.uo ? selectZona : []"
              placeholder="Zona de Muestra"
              label="Zona"
            />
            <FormKit
              v-model="form.infraestructura"
              type="select"
              :options="form.zona ? selectInfraestructura : []"
              placeholder="Infraestructura"
              label="Infraestructura"
            />
            <FormKit
              v-model="form.punto_muestreo_fk"
              type="select"
              :options="selectPuntosMuestra"
              placeholder="Punto de muestra"
              label="Punto de Muestra"
            />
          </div>
         

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormKit
              v-model.number="form.type"
              type="radio"
              :options="{ 29: 'Rutina', 28: 'Operacional' }"
              label="Tipo de Analitica"
            />
          </div>
          <div v-if="form.type">
            <div v-if="form.type === 29">
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
                v-model.number="form.cloro"
                type="number"
                placeholder="Cloro Residual"
                label="Cloro Residual"
                help="mg/l"
                validation="number|min:0|max:99"
              ></FormKit>
              <FormKit
                v-model="form.ph"
                type="number"
                placeholder="pH"
                label="pH"
                help="ud"
                validation="number|min:0|max:14"
              />
              <FormKit
                v-model.number="form.turbidez"
                type="number"
                placeholder="Turbidez"
                label="Turbidez"
                help="UNF"
                validation="number|min:0|max:999"
              />
            </div>
            <div>
              <FormKit
                v-model="form.observaciones"
                type="textarea"
                placeholder="Introduce cualquier tipo de incidencia"
                inner-class="w-full"
                wrapper-class="w-full"
              />
            </div>
          </div>
        </FormKit>

        <!-- <BaseButtons>
          <BaseButton type="submit" color="info" label="Enviar" />
          <BaseButtons type="reset" color="info" outline label="Borrar" />
        </BaseButtons> -->
        <!-- </FormKit> -->
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
