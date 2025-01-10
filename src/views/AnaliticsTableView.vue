<script setup>
import {  mdiFlaskEmptyOutline, mdiFilter, mdiDownload } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import {onMounted, ref} from 'vue'
// import NotificationBar from '@/components/NotificationBar.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
// import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import AnaliticsTable from '@/components/AnaliticsTable.vue'
import useExtractdata from '@/composables/useUploadFormData'

const tablaAnaliticas = ref();
const { exportXMLData } = useExtractdata()

const limpiarFiltros=()=>{
  tablaAnaliticas.value?.resetForm();
}

const downloadXML = () => {
  console.log('TablaAnaliticas:', tablaAnaliticas.value)
  console.log('CheckedRows:', tablaAnaliticas.value?.checkedRows)
  // Obtener analíticas seleccionadas
  const analiticasSeleccionadas = tablaAnaliticas.value?.checkedRows || []

  console.log('Analíticas seleccionadas:', analiticasSeleccionadas)
  
  if (analiticasSeleccionadas.length === 0) {
    alert('Por favor, seleccione al menos una analítica')
    return
  }

  // Generar XML
  const xmlContent = exportXMLData(analiticasSeleccionadas)
  
  // Crear Blob
  const blob = new Blob([xmlContent], { type: 'application/xml' })
  
  // Crear URL y link para descarga
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `analiticas_${new Date().toISOString().split('T')[0]}.xml`)
  
  // Trigger descarga
  document.body.appendChild(link)
  link.click()
  
  // Limpieza
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}



defineEmits(['clean-filters']);
</script>



<template>


  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFlaskEmptyOutline" title="Analíticas" main>
        <div class="flex gap-2">

          <BaseButton
          target="_blank"
          :icon="mdiDownload"
          label="Download XML"
          color="info"
          rounded-full
          small
          @click='downloadXML'
          />
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
        <AnaliticsTable ref="tablaAnaliticas" checkable />
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