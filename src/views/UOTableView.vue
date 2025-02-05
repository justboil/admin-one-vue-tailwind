<script setup>
import {  mdiFlaskEmptyOutline, mdiFilter, mdiDownload, mdiSetCenter } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import {ref} from 'vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import UOTable from '@/components/UOTable.vue'

const tablaAnaliticas = ref();

const limpiarFiltros=()=>{
  tablaAnaliticas.value?.resetForm();
}


defineEmits(['clean-filters']);
</script>



<template>


  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiSetCenter" title="Unidades Operativas" main>
        <div class="flex gap-2">
          <BaseButton
          target="_blank"
          :icon="mdiFilter"
          label="Limpiar filtros"
          color="contrast"
          rounded-full
          small
          @click='limpiarFiltros'
          />
        </div>
      </SectionTitleLineWithButton>
      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->

      <CardBox class="mb-6" has-table>
        <UOTable ref="tablaAnaliticas" checkable />
      </CardBox>

      
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