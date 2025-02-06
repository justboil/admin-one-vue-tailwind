<script setup>
import {  mdiFlaskEmptyOutline, mdiFilter, mdiDownload, mdiSetCenter, mdiPlusBox } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import {ref} from 'vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import UOTable from '@/components/UOTable.vue'
import CardBoxModalForm from '@/components/CardBoxModalForm.vue'
import FormUO from '@/components/FormUO.vue'


const isModalActive = ref(false)
const table=ref(null)


const createUO = () => {
  // isModalActive.value = true;
  table.value.openModal()
}


</script>



<template>


  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiSetCenter" title="Unidades Operativas" main>
        <div class="flex gap-2">
          <BaseButton
          target="_blank"
          :icon="mdiPlusBox"
          label="Nueva Unidad Operativa"
          color="info"
          outline          
          rounded-full
          small
          @click='createUO'
          />
        </div>
      </SectionTitleLineWithButton>
      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->

      <CardBox class="mb-6" has-table>
        <UOTable ref="table"/>
      </CardBox>

      <!-- <CardBoxModalForm v-model="isModalActive" :title="`Crear Unidad Operativa`" has-cancel>
        <FormUO />
      </CardBoxModalForm> -->

      
      <!-- <CardBox class="mb-6" has-table>
        <AnaliticsTablePrimeVue checkable />
      </CardBox> -->

      <!-- <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" /> -->

      <!-- <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar> -->

      <!-- <CardBox>
        <CardBoxComponentEmpty />
      </CardBox> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>