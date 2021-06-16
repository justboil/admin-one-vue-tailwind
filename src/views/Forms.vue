<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    Forms
    <template #right>
      <router-link to="/" class="button light">
        Dashboard
      </router-link>
    </template>
  </hero-bar>
  <main-section>
    <card-component title="Forms" :icon="mdiBallot">
      <form @submit.prevent="submit">
        <field label="From" wrap-body>
          <field>
            <control :icon-left="mdiAccount">
              <input class="input" type="text" placeholder="Name">
            </control>
          </field>
          <field>
            <control :icon-left="mdiMail" :icon-right="mdiCheck">
              <input class="input" type="email" placeholder="Email" value="alex@smith.com">
            </control>
          </field>
        </field>

        <field wrap-body>
          <field help="Do not enter the leading zero">
            <field addons>
              <control>
                <input class="input" value="+44" size="3" readonly>
              </control>
              <control expanded>
                <input class="input" type="tel" placeholder="Your phone number">
              </control>
            </field>
          </field>
        </field>

        <field label="Department">
          <control>
            <div class="select">
              <select name="s">
                <option>Business development</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>
          </control>
        </field>

        <divider/>

        <field label="Subject" help="Message subject">
          <control>
            <input class="input" type="text" placeholder="e.g. Partnership opportunity">
          </control>
        </field>

        <field label="Question" help="Your question. Max 255 characters">
          <control>
            <textarea class="textarea" placeholder="Explain how we can help you"></textarea>
          </control>
        </field>

        <divider/>

        <field grouped>
          <control>
            <button type="submit" class="button green">
              Submit
            </button>
          </control>
          <control>
            <button type="reset" class="button red">
              Reset
            </button>
          </control>
        </field>
      </form>
    </card-component>
    <card-component title="Custom elements" :icon="mdiBallotOutline">

      <field label="Checkbox" wrap-body>
        <check-radio-picker
          name="sample-checkbox"
          v-model="customElementsForm.checkbox"
          :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
        />
      </field>

      <divider />

      <field label="Radio" wrap-body>
        <check-radio-picker
          name="sample-radio"
          type="radio"
          v-model="customElementsForm.radio"
          :options="{ one: 'One', two: 'Two' }"
        ></check-radio-picker>
      </field>

      <divider />

      <field label="Switch">
        <check-radio-picker
          name="sample-switch"
          type="switch"
          v-model="customElementsForm.switch"
          :options="{ one: 'One', two: 'Two' }"
        ></check-radio-picker>
      </field>

      <divider />

      <file-picker v-model="customElementsForm.file" />
    </card-component>
  </main-section>
</template>

<script>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck } from '@mdi/js'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import FilePicker from '@/components/FilePicker'
import HeroBar from '@/components/HeroBar'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'

export default {
  name: 'Forms',
  components: {
    Divider,
    MainSection,
    HeroBar,
    FilePicker,
    CheckRadioPicker,
    CardComponent,
    TitleBar,
    Field,
    Control
  },
  setup () {
    const titleStack = ref(['Admin', 'Forms'])

    const form = reactive({
      name: null,
      email: null,
      phone: null,
      department: null,
      subject: null,
      question: null
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

    return {
      titleStack,
      form,
      customElementsForm,
      submit,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiMail,
      mdiCheck
    }
  }
}
</script>
