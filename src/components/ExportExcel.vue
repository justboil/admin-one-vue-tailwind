<script setup>
import { defineProps, toRefs } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { mdiDownload, mdiFileExcel } from '@mdi/js';
import useExtractdata from '@/composables/useUploadFormData'; // Para la lógica XML
import * as XLSX from 'xlsx'; // Para la lógica Excel
import { usePlantasStore } from '@/stores/plantas'; // Para obtener nombres/datos adicionales si es necesario

const props = defineProps({
  selectedRows: {
    type: Array,
    default: () => []
  },
  allAnaliticasForDateRange: { // Para el caso de Excel que necesita un rango de fechas basado en selección
    type: Array,
    default: () => []
  },
  fileNameBase: {
    type: String,
    default: 'exportacion'
  },
  enableXmlExport: {
    type: Boolean,
    default: true
  },
  enableExcelExport: {
    type: Boolean,
    default: true
  }
});

const { selectedRows, allAnaliticasForDateRange, fileNameBase } = toRefs(props);
const { exportXMLData } = useExtractdata(); // Asumiendo que esta es tu lógica de generación de XML
const plantasStore = usePlantasStore(); // Para obtener datos de referencia como nombres

// --- Lógica para formatear datos para Excel (similar a la propuesta anterior) ---
const getPuntoMuestreoNombre = (id) => plantasStore.getPuntosMuestreo.find(p => p.id === id)?.name || 'N/A';
const getOperarioNombre = (id) => plantasStore.getOperarios.find(o => o.id === id)?.name || 'N/A';
const getTipoAnaliticaNombre = (id) => {
  if (id === 28) return 'Operacional';
  if (id === 29) return 'Rutina';
  return 'N/A';
};
const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};
const formatOrganoleptico = (value) => {
  if (value === 1) return 'Conforme';
  if (value === 0) return 'No Conforme';
  return '';
};
// --- Fin de la lógica para formatear datos para Excel ---

const handleDownloadXML = () => {
  if (selectedRows.value.length === 0) {
    alert('Por favor, seleccione al menos una analítica para exportar a XML.');
    return;
  }
  // Filtrar solo tipos 28 y 29 para XML
  const analiticasParaXml = selectedRows.value.filter(item => item.type === 28 || item.type === 29);

  if (analiticasParaXml.length === 0) {
    alert('Las analíticas seleccionadas no son de tipo Operacional o Rutina, requeridas para la exportación XML.');
    return;
  }

  const xmlContent = exportXMLData(analiticasParaXml);
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileNameBase.value}_${new Date().toISOString().split('T')[0]}.xml`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const handleDownloadExcel = () => {
  if (selectedRows.value.length === 0) {
    alert('Por favor, seleccione al menos una analítica para definir el rango de fechas para la exportación a Excel.');
    return;
  }

  let minDate = selectedRows.value[0].fecha;
  let maxDate = selectedRows.value[0].fecha;

  selectedRows.value.forEach(row => {
    if (row.fecha < minDate) minDate = row.fecha;
    if (row.fecha > maxDate) maxDate = row.fecha;
  });

  const analiticasEnRango = allAnaliticasForDateRange.value.filter(analitica => {
    return analitica.fecha >= minDate && analitica.fecha <= maxDate;
  });

  if (analiticasEnRango.length === 0) {
    alert('No se encontraron analíticas en el rango de fechas determinado por su selección.');
    return;
  }

  const dataForSheet = analiticasEnRango.map(a => ({
    'Fecha': formatDateForDisplay(a.fecha),
    'Punto de Muestreo': getPuntoMuestreoNombre(a.punto_muestreo_fk),
    'Operario': getOperarioNombre(a.personal_fk),
    'Tipo Analítica': getTipoAnaliticaNombre(a.type),
    'Cloro (mg/l)': a.cloro,
    'pH': a.ph,
    'Turbidez (NTU)': a.turbidez,
    'Olor': formatOrganoleptico(a.olor),
    'Sabor': formatOrganoleptico(a.sabor),
    'Observaciones': a.observaciones
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForSheet);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Analíticas');
  const excelFileName = `${fileNameBase.value}_${minDate}_a_${maxDate}.xlsx`;
  XLSX.writeFile(workbook, excelFileName);
};

</script>

<template>
  <div class="flex gap-2">
    <BaseButton
      v-if="props.enableXmlExport"
      :icon="mdiDownload"
      label="Download XML"
      color="info"
      rounded-full
      small
      :disabled="selectedRows.length === 0"
      @click="handleDownloadXML"
    />
    <BaseButton
      v-if="props.enableExcelExport"
      label="Exportar Excel"
      color="success"
      :icon="mdiFileExcel"
      rounded-full
      small
      :disabled="selectedRows.length === 0"
      @click="handleDownloadExcel"
    />
    <!-- Puedes añadir más botones de exportación aquí -->
  </div>
</template>