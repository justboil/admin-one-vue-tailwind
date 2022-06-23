<script setup>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import FilePicker from '@/components/FilePicker.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitledSection from '@/components/TitledSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'

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
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Forms</HeroBar>

  <MainSection>
    <TitleSubBar
      :icon="mdiBallotOutline"
      title="Forms example"
    />
    <CardComponent
      title="Forms"
      :icon="mdiBallot"
      form
      @submit.prevent="submit"
    >
      <Field label="Grouped with icons">
        <Control
          v-model="form.name"
          :icon="mdiAccount"
        />
        <Control
          v-model="form.email"
          type="email"
          :icon="mdiMail"
        />
      </Field>

      <Field
        label="With help line"
        help="Do not enter the leading zero"
      >
        <Control
          v-model="form.phone"
          type="tel"
          placeholder="Your phone number"
        />
      </Field>

      <Field label="Dropdown">
        <Control
          v-model="form.department"
          :options="selectOptions"
        />
      </Field>

      <Divider />

      <Field
        label="Question"
        help="Your question. Max 255 characters"
      >
        <Control
          type="textarea"
          placeholder="Explain how we can help you"
        />
      </Field>

      <Divider />

      <JbButtons>
        <JbButton
          type="submit"
          color="info"
          label="Submit"
        />
        <JbButton
          type="reset"
          color="info"
          outline
          label="Reset"
        />
      </JbButtons>
    </CardComponent>
  </MainSection>

  <TitledSection>
    Custom elements
  </TitledSection>

  <MainSection>
    <CardComponent
      title="Custom elements"
      :icon="mdiBallotOutline"
    >
      <Field
        label="Checkbox"
        wrap-body
      >
        <CheckRadioPicker
          v-model="customElementsForm.checkbox"
          name="sample-checkbox"
          :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
        />
      </Field>

      <Divider />

      <Field
        label="Radio"
        wrap-body
      >
        <CheckRadioPicker
          v-model="customElementsForm.radio"
          name="sample-radio"
          type="radio"
          :options="{ one: 'One', two: 'Two' }"
        />
      </Field>

      <Divider />

      <Field label="Switch">
        <CheckRadioPicker
          v-model="customElementsForm.switch"
          name="sample-switch"
          type="switch"
          :options="{ one: 'One', two: 'Two' }"
        />
      </Field>

      <Divider />

      <FilePicker v-model="customElementsForm.file" />
    </CardComponent>
  </MainSection>

  <BottomOtherPagesSection />
</template>
