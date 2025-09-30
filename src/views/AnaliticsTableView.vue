<script setup>
import { mdiFlaskEmptyOutline, mdiFilter, mdiDownload, mdiRocket } from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import { computed, ref, watch } from 'vue';
import { usePlantasStore } from '@/stores/plantas';
import CardBox from '@/components/CardBox.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import AnaliticsTable from '@/components/AnaliticsTable.vue';
import AnaliticsTableServerSide from '@/components/AnaliticsTableServerSide.vue';
import useExtractdata from '@/composables/useUploadFormData';
import BaseIcon from '@/components/BaseIcon.vue';

import AdvancedExportControls from '@/components/AdvancedExportControls.vue';

const tablaAnaliticas = ref();
const plantasStore = usePlantasStore();
const { exportXMLData } = useExtractdata();
const selectedZona= ref(null);
const useServerSide = ref(true); // Toggle para alternar entre implementaciones

const limpiarFiltros = () => {
  tablaAnaliticas.value?.resetForm();
};

const toggleTableMode = () => {
  useServerSide.value = !useServerSide.value;
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

// Para exportaciones, cargar analíticas si no están disponibles
const allAnaliticasForDateRange = computed(() => {
  // Si usamos server-side, no necesitamos todas las analíticas para exportar
  if (useServerSide.value) {
    console.warn('⚠️ Exportación en modo server-side puede requerir carga adicional')
    return selectedAnaliticasFromTable.value // Solo exportar seleccionadas
  }
  return plantasStore.getAnaliticas
});

// Método para forzar carga de todas las analíticas cuando se necesite para exportación
const loadAllAnalyticsForExport = async () => {
  if (!plantasStore.isAnalyticasLoaded) { 
    console.log('🔄 Cargando todas las analíticas para exportación...')
    await plantasStore.loadAnaliticas()
  }
};

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFlaskEmptyOutline" title="Analíticas" main>
        <div class="flex flex-wrap gap-2">
          <BaseButton
            :icon="mdiRocket"
            :label="useServerSide ? 'Usar Client-Side' : 'Usar Server-Side'"
            :color="useServerSide ? 'success' : 'warning'"
            rounded-full
            small
            @click="toggleTableMode"
          />

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
        <!-- Modo Server-Side (Optimizado) -->
        <AnaliticsTableServerSide 
          v-if="useServerSide"
          ref="tablaAnaliticas" 
          checkable 
        />
        
        <!-- Modo Client-Side (Original) -->
        <AnaliticsTable 
          v-else
          ref="tablaAnaliticas" 
          checkable 
        />
      </CardBox>

      <!-- Información sobre el modo actual -->
      <CardBox v-if="useServerSide" class="bg-green-50 border-green-200">
        <div class="flex items-center gap-2 text-green-700">
          <BaseIcon :path="mdiRocket" />
          <div>
            <h3 class="font-semibold">Modo Server-Side Activo ⚡</h3>
            <p class="text-sm">Optimizado para grandes volúmenes de datos. Solo carga 20-100 registros por página.</p>
            <!-- <p class="text-xs mt-1">💡 <strong>Beneficios:</strong> Carga inicial rápida, menor uso de memoria, escalable.</p> -->
          </div>
        </div>
      </CardBox>
      
      <CardBox v-else class="bg-blue-50 border-blue-200">
        <div class="flex items-center gap-2 text-blue-700">
          <BaseIcon :path="mdiFilter" />
          <div>
            <h3 class="font-semibold">Modo Client-Side Activo</h3>
            <p class="text-sm">Carga todas las analíticas al iniciar. Ideal para conjuntos pequeños de datos (&lt;1000 registros).</p>
            <p class="text-xs mt-1 text-blue-600">
              📊 Estado: {{ plantasStore.isAnalyticasLoaded ? 
                `${plantasStore.analyticsCount} analíticas cargadas` : 
                'Analíticas no cargadas aún' 
              }}
            </p>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
``` 