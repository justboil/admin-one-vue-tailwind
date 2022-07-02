<script setup>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

const titleStack = ref(['Admin', 'Forms'])

const selectOptions = [
  { id: 1, label: 'Business development' },
  { id: 2, label: 'Marketing' },
  { id: 3, label: 'Sales' }
]

const form = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
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
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Forms</SectionHeroBar>

  <SectionMain>
    <SectionTitleBarSub
      :icon="mdiBallotOutline"
      title="Forms example"
    />
    <CardBox
      title="Forms"
      :icon="mdiBallot"
      form
      @submit.prevent="submit"
    >
      <FormField label="Grouped with icons">
        <FormControl
          v-model="form.name"
          :icon="mdiAccount"
        />
        <FormControl
          v-model="form.email"
          type="email"
          :icon="mdiMail"
        />
      </FormField>

      <FormField
        label="With help line"
        help="Do not enter the leading zero"
      >
        <FormControl
          v-model="form.phone"
          type="tel"
          placeholder="Your phone number"
        />
      </FormField>

      <FormField label="Dropdown">
        <FormControl
          v-model="form.department"
          :options="selectOptions"
        />
      </FormField>

      <BaseDivider />

      <FormField
        label="Question"
        help="Your question. Max 255 characters"
      >
        <FormControl
          type="textarea"
          placeholder="Explain how we can help you"
        />
      </FormField>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          type="submit"
          color="info"
          label="Submit"
        />
        <BaseButton
          type="reset"
          color="info"
          outline
          label="Reset"
        />
      </BaseButtons>
    </CardBox>
  </SectionMain>

  <SectionTitle>
    Custom elements
  </SectionTitle>

  <SectionMain>
    <CardBox
      title="Custom elements"
      :icon="mdiBallotOutline"
    >
      <FormField
        label="Checkbox"
        wrap-body
      >
        <FormCheckRadioPicker
          v-model="customElementsForm.checkbox"
          name="sample-checkbox"
          :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
        />
      </FormField>

      <BaseDivider />

      <FormField
        label="Radio"
        wrap-body
      >
        <FormCheckRadioPicker
          v-model="customElementsForm.radio"
          name="sample-radio"
          type="radio"
          :options="{ one: 'One', two: 'Two' }"
        />
      </FormField>

      <BaseDivider />

      <FormField label="Switch">
        <FormCheckRadioPicker
          v-model="customElementsForm.switch"
          name="sample-switch"
          type="switch"
          :options="{ one: 'One', two: 'Two' }"
        />
      </FormField>

      <BaseDivider />

      <FormFilePicker v-model="customElementsForm.file" />
    </CardBox>
  </SectionMain>

  <SectionBottomOtherPages />
</template>
