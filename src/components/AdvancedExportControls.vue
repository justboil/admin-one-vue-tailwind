<script setup>
import { defineProps, toRefs } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { mdiPrinter } from '@mdi/js'; // Solo necesitamos el icono de imprimir
import { usePlantasStore } from '@/stores/plantas';

const props = defineProps({
  selectedRows: {
    type: Array,
    default: () => []
  },
  allAnaliticasForDateRange: {
    type: Array,
    default: () => []
  },
  fileNameBase: { // Aunque no se usa para el nombre de archivo, puede ser útil para el título del HTML
    type: String,
    default: 'Informe_Analiticas'
  },
  logoUrl: {
    type: String,
    default: 'https://www.aqlara.com/wp-content/uploads/2022/01/Logo-aclara-300x126-v2.jpg' // Ajusta esta ruta si es necesario
  },
  companyName: {
    type: String,
    default: 'AQLARA Ciclo Integral del Agua'
  },
  enableHtmlPrint: { // Prop para mantener la consistencia, aunque ahora será la única función
    type: Boolean,
    default: true
  },
  selectedZona: {
    type: [Number, null],
    default: null
  }
});

const { selectedRows, allAnaliticasForDateRange, fileNameBase, logoUrl, companyName, selectedZona } = toRefs(props);
const plantasStore = usePlantasStore();

const getZonaNombre = (zonaId) => {
  if (!zonaId) return '';
  const zona = plantasStore.getZonas.find(z => z.id === zonaId);
  return zona ? zona.name : '';
};

// --- Funciones auxiliares de formato ---
const getPuntoMuestreoNombre = (id) => plantasStore.getPuntosMuestreo.find(p => p.id === id)?.name || 'N/A';
const getOperarioNombre = (id) => plantasStore.getOperarios.find(o => o.id === id)?.name || 'N/A';
const getTipoAnaliticaNombre = (id) => {
  if (id === 28) return 'Operacional';
  if (id === 29) return 'Rutina';
  return 'N/A';
};
const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const formatOrganoleptico = (value) => {
  if (value === 1) return 'Conforme';
  if (value === 0) return 'No Conforme';
  return '';
};
// --- Fin de funciones auxiliares ---

const getAnaliticasParaExportar = () => {
  if (selectedRows.value.length === 0) {
    alert('Por favor, seleccione al menos una analítica para definir el rango de fechas.');
    return null;
  }

  let minDate = selectedRows.value[0].fecha;
  let maxDate = selectedRows.value[0].fecha;
  selectedRows.value.forEach(row => {
    if (row.fecha < minDate) minDate = row.fecha;
    if (row.fecha > maxDate) maxDate = row.fecha;
  });

  const analiticasFiltradas = allAnaliticasForDateRange.value.filter(analitica => {
    return analitica.fecha >= minDate && analitica.fecha <= maxDate;
  });

  if (analiticasFiltradas.length === 0) {
    alert('No se encontraron analíticas en el rango de fechas seleccionado.');
    return null;
  }
  return { analiticas: analiticasFiltradas, minDate, maxDate };
};

// ...existing code...

const handlePrintHTML = () => {
  const exportData = getAnaliticasParaExportar();
  if (!exportData) return;
  let { analiticas, minDate, maxDate } = exportData;

  // Ordenar las analíticas primero por punto de muestreo y luego por fecha
  analiticas = [...analiticas].sort((a, b) => {
    // Primero comparamos por punto de muestreo
    if (a.punto_muestreo_fk !== b.punto_muestreo_fk) {
      // Si los puntos de muestreo son diferentes, ordenamos por su ID
      return a.punto_muestreo_fk - b.punto_muestreo_fk;
    }
    
    // Si los puntos de muestreo son iguales, ordenamos por fecha
    // Convertimos las fechas a objetos Date para compararlas correctamente
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaA - fechaB; // Orden ascendente por fecha (más antigua primero)
  });

  // Construir el título con la zona si está seleccionada
  let tituloInforme = `Informe de Analíticas (${formatDateForDisplay(minDate)} - ${formatDateForDisplay(maxDate)})`;
  if (selectedZona.value) {
    const nombreZona = getZonaNombre(selectedZona.value);
    if (nombreZona) {
      tituloInforme = `Informe de Analíticas - ${nombreZona} (${formatDateForDisplay(minDate)} - ${formatDateForDisplay(maxDate)})`;
    }
  }

  let htmlContent = `
    <html>
      <head>
        <title>${fileNameBase.value} - ${companyName.value}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #00447C;}
          .logo-container { flex-shrink: 0; }
          .logo { max-height: 60px; }
          .header-text { text-align: right; flex-grow: 1;}
          .company-name-html { font-size: 20px; font-weight: bold; color: #00447C; margin-bottom: 5px;}
          .report-title-html { font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px; }
          th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
          th { background-color: #00447C; color: white; }
          /* Estilo para resaltar visualmente grupos de puntos de muestreo */
          tr.grupo-nuevo td { border-top: 2px solid #00447C; }
          @media print {
            body { margin: 0.5cm; }
            .no-print { display: none; }
            .page-header { justify-content: flex-start; }
            .header-text { text-align: center; margin-left: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="page-header">
          <div class="logo-container">
            ${logoUrl.value ? `<img src="${logoUrl.value}" alt="Logo" class="logo"/>` : ''}
          </div>
          <div class="header-text">
            <div class="company-name-html">${companyName.value}</div>
            <div class="report-title-html">${tituloInforme}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Punto de Muestreo</th>
              <th>Código SINAC</th>
              <th>Cloro (mg/l)</th>
              <th>pH</th>
              <th>Turbidez (NTU)</th>
              <th>Olor</th>
              <th>Sabor</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
  `;

  // Variable para rastrear cambios de punto de muestreo
  let puntoMuestreoAnterior = null;

  analiticas.forEach(a => {
    // Determinar si es un nuevo grupo de punto de muestreo
    const esNuevoGrupo = puntoMuestreoAnterior !== a.punto_muestreo_fk;
    puntoMuestreoAnterior = a.punto_muestreo_fk;

    // Añadir clase para resaltar visualmente cuando cambia el punto de muestreo
    const claseGrupo = esNuevoGrupo ? 'class="grupo-nuevo"' : '';

    htmlContent += `
            <tr ${claseGrupo}>
              <td>${formatDateForDisplay(a.fecha)}</td>
              <td>${getPuntoMuestreoNombre(a.punto_muestreo_fk)}</td>
              <td>${a.punto_muestreo_fk}</td>
              <td>${a.cloro !== null && a.cloro !== undefined ? a.cloro : ''}</td>
              <td>${a.ph !== null && a.ph !== undefined ? a.ph : ''}</td>
              <td>${a.turbidez !== null && a.turbidez !== undefined ? a.turbidez : ''}</td>
              <td>${formatOrganoleptico(a.olor)}</td>
              <td>${formatOrganoleptico(a.sabor)}</td>
              <td>${formatOrganoleptico(a.color)}</td>
            </tr>
    `;
  });

  htmlContent += `
          </tbody>
        </table>
        <button class="no-print" onclick="window.print()" style="margin-top: 20px;">Imprimir</button>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

// const handlePrintHTML = () => {
//   const exportData = getAnaliticasParaExportar();
//   if (!exportData) return;
//   const { analiticas, minDate, maxDate } = exportData;

//   let htmlContent = `
//     <html>
//       <head>
//         <title>${fileNameBase.value} - ${companyName.value}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #00447C;}
//           .logo-container { flex-shrink: 0; }
//           .logo { max-height: 60px; }
//           .header-text { text-align: right; flex-grow: 1;}
//           .company-name-html { font-size: 20px; font-weight: bold; color: #00447C; margin-bottom: 5px;}
//           .report-title-html { font-size: 16px; }
//           table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px; }
//           th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
//           th { background-color: #00447C; color: white; }
//           @media print {
//             body { margin: 0.5cm; }
//             .no-print { display: none; }
//             .page-header { justify-content: flex-start; }
//             .header-text { text-align: center; margin-left: 20px; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="page-header">
//           <div class="logo-container">
//             ${logoUrl.value ? `<img src="${logoUrl.value}" alt="Logo" class="logo"/>` : ''}
//           </div>
//           <div class="header-text">
//             <div class="company-name-html">${companyName.value}</div>
//             <div class="report-title-html">Informe de Analíticas (${formatDateForDisplay(minDate)} - ${formatDateForDisplay(maxDate)})</div>
//           </div>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>Fecha</th>
//               <th>Punto de Muestreo</th>
//               <th>Código SINAC</th>
//               <th>Cloro (mg/l)</th>
//               <th>pH</th>
//               <th>Turbidez (NTU)</th>
//               <th>Olor</th>
//               <th>Sabor</th>
//               <th>Color</th>
//             </tr>
//           </thead>
//           <tbody>
//   `;

//   analiticas.forEach(a => {
//     htmlContent += `
//             <tr>
//               <td>${formatDateForDisplay(a.fecha)}</td>
//               <td>${getPuntoMuestreoNombre(a.punto_muestreo_fk)}</td>
//               <td>${a.punto_muestreo_fk}</td>
//               <td>${a.cloro !== null && a.cloro !== undefined ? a.cloro : ''}</td>
//               <td>${a.ph !== null && a.ph !== undefined ? a.ph : ''}</td>
//               <td>${a.turbidez !== null && a.turbidez !== undefined ? a.turbidez : ''}</td>
//               <td>${formatOrganoleptico(a.olor)}</td>
//               <td>${formatOrganoleptico(a.sabor)}</td>
//               <td>${formatOrganoleptico(a.color)}</td>
//             </tr>
//     `;
//   });

//   htmlContent += `
//           </tbody>
//         </table>
//         <button class="no-print" onclick="window.print()" style="margin-top: 20px;">Imprimir</button>
//       </body>
//     </html>
//   `;

//   const printWindow = window.open('', '_blank');
//   printWindow.document.open();
//   printWindow.document.write(htmlContent);
//   printWindow.document.close();
// };

</script>

<template>
  <div class="flex flex-wrap gap-2">
    <BaseButton 
    v-if="props.enableHtmlPrint"
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
    
      label="Imprimir"
      :icon="mdiPrinter"
      rounded-full
      small
      :disabled="selectedRows.length === 0"
      @click="handlePrintHTML"
    />
  </div>
</template>