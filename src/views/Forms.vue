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
  <title-bar :title-stack="titleStack" />
  <hero-bar>Forms</hero-bar>

  <main-section>
    <title-sub-bar
      :icon="mdiBallotOutline"
      title="Forms example"
    />
    <card-component
      title="Forms"
      :icon="mdiBallot"
      form
      @submit.prevent="submit"
    >
      <field label="Grouped with icons">
        <control
          v-model="form.name"
          :icon="mdiAccount"
        />
        <control
          v-model="form.email"
          type="email"
          :icon="mdiMail"
        />
      </field>

      <field
        label="With help line"
        help="Do not enter the leading zero"
      >
        <control
          v-model="form.phone"
          type="tel"
          placeholder="Your phone number"
        />
      </field>

      <field label="Dropdown">
        <control
          v-model="form.department"
          :options="selectOptions"
        />
      </field>

      <divider />

      <field
        label="Question"
        help="Your question. Max 255 characters"
      >
        <control
          type="textarea"
          placeholder="Explain how we can help you"
        />
      </field>

      <divider />

      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Submit"
        />
        <jb-button
          type="reset"
          color="info"
          outline
          label="Reset"
        />
      </jb-buttons>
    </card-component>
  </main-section>

  <titled-section>
    Custom elements
  </titled-section>

  <main-section>
    <card-component
      title="Custom elements"
      :icon="mdiBallotOutline"
    >
      <field
        label="Checkbox"
        wrap-body
      >
        <check-radio-picker
          v-model="customElementsForm.checkbox"
          name="sample-checkbox"
          :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
        />
      </field>

      <divider />

      <field
        label="Radio"
        wrap-body
      >
        <check-radio-picker
          v-model="customElementsForm.radio"
          name="sample-radio"
          type="radio"
          :options="{ one: 'One', two: 'Two' }"
        />
      </field>

      <divider />

      <field label="Switch">
        <check-radio-picker
          v-model="customElementsForm.switch"
          name="sample-switch"
          type="switch"
          :options="{ one: 'One', two: 'Two' }"
        />
      </field>

      <divider />

      <file-picker v-model="customElementsForm.file" />
    </card-component>
  </main-section>

  <bottom-other-pages-section />
</template>
