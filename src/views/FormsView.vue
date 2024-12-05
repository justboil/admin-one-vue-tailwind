<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'

const selectOptions = [
  { id: 1, label: 'Guissona 17012' },
  { id: 2, label: 'Sot de chera 40210' },
  { id: 3, label: 'Chulilla 20201' }
]

const form = reactive({
  name: 'Alejandro',
  email: 'alejandro@example.com',
  phone: '',
  department: selectOptions[0],
  subject: '',
  question: ''
})

const customElementsForm = reactive({
  checkbox: ['lorem'],
  radio: 'one',
  switch: ['one'],
  file: null
})

const submit = () => {
  //
}

const formStatusWithHeader = ref(true)

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0
}
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
        <FormField label="Nombre Operario">
          <FormControl v-model="form.name" :icon="mdiAccount" />
          <FormControl v-model="form.email" type="email" :icon="mdiMail" />
        </FormField>
        <div>
          <BaseDivider />
          <FormField label="Tipo de Analítica">
          <FormCheckRadioGroup
            v-model="customElementsForm.radio"
            name="sample-radio"
            type="radio"
            :options="{ one: 'Rutina', two: 'Operacional' }"
          />
        </FormField>
          <FormField label="Punto de la muestra" help="Zona de la muestra">
            <FormControl v-model="form.phone" type="tel" :options="['Primero', 'segundo', 'tercero', 'cuarto']" placeholder="Zona de muestra" />
            <FormControl v-model="form.department" :options="selectOptions" placeholder="Punto de muestra"/>
            <FormControl v-model="form.type" :options="['Rutina','Operacional']" placeholder="Tipo Analitica"/>
          </FormField>  

          <BaseDivider />
          

        <BaseDivider />

          

         
        </div>

        <BaseDivider />

        <FormField label="Observaciones" help="Observaciones. Max 255 carácteres">
          <FormControl type="textarea" placeholder="Introduce cualquier tipo de incidencia" />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Enviar" />
            <BaseButton type="reset" color="info" outline label="Borrar" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>

    <SectionTitle>A probar</SectionTitle>

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
  </LayoutAuthenticated>
</template>
