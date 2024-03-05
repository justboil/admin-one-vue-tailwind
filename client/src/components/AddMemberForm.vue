<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub, mdiHome, mdiPhoneClassic, mdiPhone, mdiHandshakeOutline } from '@mdi/js'
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
import axios from 'axios'
let message = "hello"

const selectOptions = ["entity", "contact"]

const form = ref({
  firstname: '',
  lastname1: '',
  lastname2: '',
  commercialName1: '',
  commercialName2: '',
  pronouns: '',
  role: '',
  officialId: '',
  email: '',
  address: '',
  city: '',
  postcode: '',
  authorizationImg: false,
  phoneNumber: '',
  memberType: '', 
})




const customElementsForm = reactive({
  checkbox: ['0'],
  radio: 'one',
  switch: ['one'],
  file: null
})

async function submit() {
    // const data = form.value;
  console.log(form.value)
  console.log(form.authorizationImg)
    try {
      const response = await axios.post("api/members", {data: form.value})

      if (response.ok) {
        message = "ha funcionat?"
        console.log("yes!" + response)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }
    console.log("submit button clicked")
}

const formStatusWithHeader = ref(true)

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0
}
function addMember() {

//     firstname : data.firstname || null, 
//     lastname1: data.lastname1 || null,
//     lastname2: data.lastname2 || null,
//     commercialName1: data.commercialName1 || null,
//     commercialName2 : data.commercialName2 || null,
//     pronouns: data.pronouns || null,
//     role: data.role || null,
//     officialId: data.officialId || null,
//     email: data.email || null,
//     address: data.address || null,
//     city: data.city || null,
//     postcode: data.postcode || null,
//     phoneNumber: data.phoneNumber || null,
//     authorizationImg: data.authorizationImg || null,
//     memberType: data.memberType || null
}


</script>

<template>
  <LayoutAuthenticated>
    {{ message }}
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiHandshakeOutline" title="Add a member, help a member" main>
       
      </SectionTitleLineWithButton>
      <FormField label="tipus de membre:">
          <FormControl v-model="form.memberType" :options="selectOptions" />
        </FormField>
        
        <BaseDivider />
      <CardBox form @submit.prevent="submit">
        <FormField v-if="form.memberType.label === 'contact'" label="noms, cognoms">
          <FormControl v-model="form.firstname" :icon="mdiAccount" placeholder="monti"/>
          <FormControl v-model="form.lastname1" :icon="mdiAccount" placeholder="buli"/>
          <FormControl v-model="form.lastname2" :icon="mdiAccount" placeholder="de la cruz"/>

            <FormField label="pronoms" help="it's a free world">
                <FormControl v-model="form.pronouns"/>
            </FormField>

            <FormField label="role" help="what do ya do, friend">
                <FormControl v-model="form.role"/>
            </FormField>

            <FormField label="dni/nie" >
                <FormControl v-model="form.officialId"/>
            </FormField>
        </FormField>
        <BaseDivider />

        <FormField v-if="form.memberType.label === 'entitat'" label="nom">
          <FormControl v-model="form.commercialName1" :icon="mdiAccount" />
          <!-- add option to add one more name -->
            <FormField label="nif">
                <FormControl v-model="form.officialId"/>
                </FormField>
        </FormField>
        
        <BaseDivider />

        <FormField label="email">
            <FormControl v-model="form.email" type="email" :icon="mdiMail" />
        </FormField>

        <FormField label="núm de télefon" help="Si no estàs a Spanya, no ens contactis. No pusis el codi de pais aqui, es trancara tot">
          <FormControl v-model="form.phone" type="tel" placeholder="123 456 789" :icon="mdiPhone" />
        </FormField>

        <FormField label="adreça">
            <FormControl v-model="form.address" :icon="mdiHome" placeholder="3 carrer dels Tres Gats"/>
            <FormControl v-model="form.city" :icon="mdiHome" placeholder="Cat City"/>
            <FormControl v-model="form.postcode"  :icon="mdiHome" placeholder="80085"/>
        </FormField>

        <BaseDivider />

        <FormField label="Notes" help="que l'hi passa a aquest membre? tothom s'ho pregunta!">
          <FormControl type="textarea" placeholder="no posis res aquí. això es un agüanta places" />
        </FormField>

        <BaseDivider />
        <FormField label="Autorizatció de compartir imatges? ">
          <FormCheckRadioGroup
            v-model="form.authorizationImg"
            name="sample-radio"
            type="radio"
            :options="{ false: 'no', true: 'sí'}"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" @click="submit"/>
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>

    <SectionTitle>Custom elements</SectionTitle>

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

     
    </SectionMain>
  </LayoutAuthenticated>
</template>
