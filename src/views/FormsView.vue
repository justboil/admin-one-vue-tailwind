<script setup>
import { computed, reactive} from 'vue'
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

const plantasStore = usePlantasStore()

const form = reactive({
  name: 'Alejandro',
  email: 'alejandro@example.com',
  phone: '',
  zonaMuestra: null,
  puntoMuestra: null,
  fecha: '',
  color: '',
  olor: [],
  sabor: '',
  cloro:'',
  tipo: ''
})

const selectZona = computed(() => {
  return plantasStore.getZonas.map((zona) => {
    return { id: zona.id, label: zona.nombre }
  })
})

const selectPunto = computed(() => {
  if (!form.zonaMuestra) return []
  return plantasStore.getPuntosMuestreo
    .filter((punto) => punto.id_planta === form.zonaMuestra.id)
    .map((punto) => {
      return { id: punto.id, label: punto.nombre }
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

const submit = () => {
  //
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
      <CardBox form @submit.prevent="submit">
        <FormField>
          <FormField label="Zona de la Muestra" help="Zona de la muestra">
            <FormControl
              v-model="form.zonaMuestra"
              type="text"
              :options="selectZona"
              placeholder="Zona de muestra"
            />
          </FormField>
          <FormField v-if="form.zonaMuestra" label="Punto de la Muestra">
            <FormControl
            
              v-model="form.puntoMuestra"
              type="select"
              :options="selectPunto"
              placeholder="Punto de muestra"
              help="Punto de la muestra"
            />
          </FormField>
        </FormField>

        <FormField label="Nombre Operario">
          <FormControl v-model="form.name" :icon="mdiAccount" />
          <FormControl v-model="form.email" type="email" :icon="mdiMail" />
        </FormField>
        <div>
          <!-- <BaseDivider /> -->

          <FormField>
            <FormField label="Fecha de la muestra" help="Fecha de la toma de la muestra">
              <FormControl
                v-model="form.phone"
                type="date"
                placeholder="Fecha de la toma de la muestra"
              />
            </FormField>

            <FormField label="Tipo de Analítica">
              <FormCheckRadioGroup
                v-model="form.tipo"
                name="sample-radio"
                type="radio"
                :options="{ rutina: 'Rutina', operacional: 'Operacional' }"
              />
            </FormField>
          </FormField>

          <!-- //*****  Analítica ******// -->
          <div v-if="form.tipo">
            <SectionTitle
              >Analítica {{ form.tipo === 'rutina' ? ' de Rutina' : ' Operacional' }}</SectionTitle
            >
            <FormField v-if="form.tipo === 'rutina'">
              <div class="flex justify-start items-center space-x-4">
                <FormField label="Caracteristicas Organolepticas">
                  <div class="flex items-center space-x-4 justify-start">
                    <FormCheckRadioGroup
                      v-model="form.olor"
                      name="Olor"
                      type="switch"
                      :options="{ sabor: 'Sabor', olor: 'Olor' }"
                    />
                    <FormField>
                      <FormControl v-model="form.color" type="number" placeholder="Color" />
                    </FormField>
                  </div>
                </FormField>
              </div>
            </FormField>

            <FormField label="Características Físicas">
              <div class="flex items-center space-x-2">
                <div class="flex items-center pr-8">
                  <FormControl
                    v-model="form.cloro"
                    type="number"
                    placeholder="Cloro Residual"
                    class="mr-1"
                  />mg/l
                </div>
                <div class="flex items-center pr-8">
                  <FormControl v-model="form.ph" type="number" placeholder="pH" class="mr-1" />
                  ud
                </div>
                <div class="flex items-center">
                  <FormControl
                    v-model="form.turbidez"
                    type="number"
                    placeholder="Turbidez"
                    class="mr-1"
                  />
                  UNF
                </div>
              </div>
            </FormField>

            <BaseDivider />

            <FormField label="Observaciones" help="Observaciones. Max 255 carácteres">
              <FormControl type="textarea" placeholder="Introduce cualquier tipo de incidencia" />
            </FormField>
          </div>
        </div>
        <template v-if="form.tipo" #footer >
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Enviar" />
            <BaseButton type="reset" color="info" outline label="Borrar" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>

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
</template>
