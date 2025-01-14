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
import FormAnalitica from '@/components/FormAnalitica.vue'



const loginStore = useLoginStore()
const plantaStore = usePlantasStore()







//

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
      <FormAnalitica/>
    </SectionMain>
  </LayoutAuthenticated>
</template>
