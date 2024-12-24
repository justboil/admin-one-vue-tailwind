<script setup>
import { computed, reactive } from 'vue'
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
import { FormKit } from '@formkit/vue'
import { setAnaliticas } from '../services/analiticas.js'
import { supabase } from '../services/supabase'

const plantasStore = usePlantasStore()

const form = reactive({
  uo: null,
  zona: null,
  punto_muestreo_fk: null,
  fecha: '',
  color: '',
  olor: '',
  sabor: '',
  cloro: '',
  type: '',
  observaciones: '',
  ph: null,
  turbidez: null,
  operario: null,
  infraestructura: null
})

const selectUO = computed(() => {
  return plantasStore.getUnidadesOperativas.map((uo) => {
    return { value: uo.id, label: uo.name }
  })
})
const selectZona = computed(() => {
  if (!form.uo) return []
  return plantasStore.getZonas
    .filter((zona) => zona.unidades_operativas_fk === form.uo)
    .map((zona) => {
      return { value: zona.id, label: zona.name }
    })
})

const selectInfraestructura = computed(() => {
  if (!form.zona) return []
  const infraestructuras = plantasStore.getZonasInfraestructuras
    .filter((infraestructura) => infraestructura.zonas_fk === form.zona)
    .map((infraestructura) => {
      // console.log(':Infraestructura: ',infraestructura)
      return {
        value: infraestructura.infraestructuras_fk,
        label: buscaInfraestructuraPorId(infraestructura.infraestructuras_fk)
      }
    })
  return infraestructuras
})

const buscaInfraestructuraPorId = (id) => {
  const infraestructura = plantasStore.getInfraestructuras.find(
    (infraestructura) => infraestructura.id === id
  )
  if (infraestructura) {
    return infraestructura.name
  } else {
    return ''
  }
}

const selectPuntosMuestra = computed(() => {
  if (!form.infraestructura) return []
  return plantasStore.getPuntosMuestreo
    .filter((punto) => punto.infraestructura_fk === form.infraestructura)
    .map((punto) => {
      return { value: punto.id, label: punto.name }
    })
})

// const selectPunto = computed(() => {
//   if (!form.zona) return []
//   return plantasStore.getPuntosMuestreo
//     .filter((punto) => punto.zonas_abastecimiento_fk === form.zona)
//     .map((punto) => {
//       return { value: punto.id, label: punto.name }
//     })
// })

const operarioPorZona = computed(() => {
  if (!form.zona) return []
  return plantasStore.getOperarios
    .filter((operario) => operario.ud_operativa_fk === form.uo)
    .map((operario) => {
      return { value: operario.id, label: operario.name }
    })
})

// onMounted(() => {
//   getData();
// })
// const a=computed

// const selectOptions = computed(() => {
//   return plantasStore.plantas.map((planta) => {
//     return { id: planta.id, label: planta.nombre };
//   });
// });

// const customElementsForm = reactive({
//   checkbox: ['lorem'],
//   radio: 'one',
//   switch: ['one'],
//   file: null,
//   olor: ['sabor']
// })

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
        turbidez: form.turbidez ? Number(form.turbidez) : null
      }
    ])

    if (error) {
      console.error('Error al insertar datos:', error)
      alert('Error al insertar datos: ' + error.message)
    } else {
      console.log('Datos insertados:', data)
      alert('Datos insertados correctamente')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    alert('Error en la solicitud: ' + error.message)
  }
}

// const formStatusWithHeader = ref(true)

// const formStatusCurrent = ref(0)

// const formStatusOptions = ['info', 'success', 'danger', 'warning']

// const formStatusSubmit = () => {
//   formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
//     ? formStatusCurrent.value + 1
//     : 0
// }
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
              :options="selectZona"
              placeholder="Zona de Muestra"
              label="Zona"
            />
            <FormKit
              v-model="form.infraestructura"
              type="select"
              :options="selectInfraestructura"
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
              v-model.number="form.operario"
              type="select"
              :options="operarioPorZona"
              placeholder="Operario"
            />
            <FormKit
              v-model="form.fecha"
              type="date"
              placeholder="Fecha de la toma de la muestra"
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
                    v-model="form.olor"
                    type="checkbox"
                    label="Olor"
                    help="Marca si el agua tiene mal olor"
                    name="terms"
                    :value="false"
                    validation-visibility="dirty"
                  />
                  <FormKit
                    v-model="form.color"
                    type="checkbox"
                    label="Color"
                    help="Marca si el agua tiene mal color"
                    name="terms"
                    :value="false"
                    validation-visibility="dirty"
                  />
                  <FormKit
                    v-model="form.sabor"
                    type="checkbox"
                    label="Sabor"
                    help="Marca si el agua tiene mal sabor"
                    name="terms"
                    :value="false"
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
              ></FormKit>
              <FormKit v-model="form.ph" type="number" placeholder="pH" label="pH" help="ud" />
              <FormKit
                v-model.number="form.turbidez"
                type="number"
                placeholder="Turbidez"
                label="Turbidez"
                help="UNF"
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

<!-- <SectionTitle>A probar</SectionTitle>

    <SectionMain>
      <CardBox>
        <FormField label="Checkbox">
          <FormCheckRadioGroup
            v-model="customElementsForm.checkbox"
            name="sample-checkbox"
            :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
          />
        </FormField>

        <BaseDivider />

        <FormField label="Radio">
          <FormCheckRadioGroup
            v-model="customElementsForm.radio"
            name="sample-radio"
            type="radio"
            :options="{ one: 'One', two: 'Two' }"
          />
        </FormField>

        <BaseDivider />

        <FormField label="Switch">
          <FormCheckRadioGroup
            v-model="customElementsForm.switch"
            name="sample-switch"
            type="switch"
            :options="{ one: 'One', two: 'Two' }"
          />
        </FormField>

        <BaseDivider />

        <FormFilePicker v-model="customElementsForm.file" label="Upload" />
      </CardBox>

      <SectionTitle>Form with status example</SectionTitle>

      <CardBox
        class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
        is-form
        is-hoverable
        @submit.prevent="formStatusSubmit"
      >
        <NotificationBarInCard
          :color="formStatusOptions[formStatusCurrent]"
          :is-placed-with-header="formStatusWithHeader"
        >
          <span
            ><b class="capitalize">{{ formStatusOptions[formStatusCurrent] }}</b> state</span
          >
        </NotificationBarInCard>
        <FormField label="Fields">
          <FormControl
            v-model="form.name"
            :icon-left="mdiAccount"
            help="Your full name"
            placeholder="Name"
          />
        </FormField>

        <template #footer>
          <BaseButton label="Trigger" type="submit" color="info" />
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated> -->
<!-- </template> -->
