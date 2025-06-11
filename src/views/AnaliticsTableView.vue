<script setup>
import { mdiFlaskEmptyOutline, mdiFilter, mdiDownload } from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import { computed, ref, watch } from 'vue';
import { usePlantasStore } from '@/stores/plantas';
import CardBox from '@/components/CardBox.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import AnaliticsTable from '@/components/AnaliticsTable.vue';
import useExtractdata from '@/composables/useUploadFormData';

import AdvancedExportControls from '@/components/AdvancedExportControls.vue';

const tablaAnaliticas = ref();
const plantasStore = usePlantasStore();
const { exportXMLData } = useExtractdata();
const selectedZona= ref(null);

const limpiarFiltros = () => {
  tablaAnaliticas.value?.resetForm();
};


// selectedZona.value = tablaAnaliticas.value?.filters?.zona || null;

watch(() => tablaAnaliticas.value?.filters?.zona, (newZona) => {
  console.log('Zona seleccionada:', newZona);
  selectedZona.value = newZona;
}, { immediate: true });



const downloadXML = () => {
  const analiticasSeleccionadas = (tablaAnaliticas.value?.checkedRows || [])
    .filter(item => item.type === 28 || item.type === 29);
  if (analiticasSeleccionadas.length === 0) {
    alert('Por favor, seleccione al menos una analítica de tipo Operacional o Rutina para XML.');
    return;
  }
  const xmlContent = exportXMLData(analiticasSeleccionadas);
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `analiticas_AQLARA_${new Date().toISOString().split('T')[0]}.xml`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const selectedAnaliticasFromTable = computed(() => tablaAnaliticas.value?.checkedRows || []);
const allAnaliticasForDateRange = computed(() => plantasStore.getAnaliticas);

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFlaskEmptyOutline" title="Analíticas" main>
        <div class="flex flex-wrap gap-2">
          <BaseButton
            v-if="exportXMLData"
            :icon="mdiDownload"
            label="Download XML"
            color="info"
            rounded-full
            small
            :disabled="selectedAnaliticasFromTable.length === 0"
            @click='downloadXML'
          />

          <AdvancedExportControls
            :selected-rows="selectedAnaliticasFromTable"
            :all-analiticas-for-date-range="allAnaliticasForDateRange"
            file-name-base="Informe_Analiticas_AQLARA"
            logo-url="https://zinnae.org/wp-content/uploads/2023/12/aqlaraLOGO-1030x503.png"
            company-name="AQLARA Ciclo Integral del Agua"
            :enable-html-print="true"
            :selected-zona="selectedZona"
          />

          <BaseButton
          class="bg-slate-600 hover:bg-slate-700 text-white  py-2 px-4 rounded"
            :icon="mdiFilter"
            label="Limpiar filtros"
            color=""
            rounded-full
            small
            @click='limpiarFiltros'
          />
        </div>
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <AnaliticsTable ref="tablaAnaliticas" checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
``` 