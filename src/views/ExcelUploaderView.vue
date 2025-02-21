<script setup>
import useStore from '../stores'
import useUploadFile from '../composables/useUploadFile'
import useExtractdata from '../composables/useExtractData'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'


const store = useStore()

const { handleFileUpload, sheetsData, errorMessage } = useUploadFile()
const { exportToXML } = useExtractdata()

//* Función para buscar el código de análisis

const getHeaders = (sheetData) => {
  return sheetData.length > 0 ? Object.keys(sheetData[0]) : []
}
</script>

<template>
  <LayoutAuthenticated>
  <div class="bg-slate-100 min-h-screen">
    <div class="bg-slate-300 pt-6 pb-4 flex justify-center items-center  flex-row">
      <!-- <img src="../assets/water-drop.svg" class="w-11 mb-4 pt mr" /> -->
      <h1 class="font-extrabold text-gray-600 text-6xl text-center pt-9">Sin</h1>
      <h1 class="font-extrabold text-gray-600 text-3xl text-center">
        Uploader
        <img src="../assets/aq_aqlara_logo_sq_icon_small.png" class="w-28" alt="aqlara Logo" />
      </h1>
    </div>
    <div class="flex justify-between bg-slate-300 p-3">
      <label
        :class="[
          'inline-block text-center rounded bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0',
          { 'w-full': !Object.keys(sheetsData).length }
        ]"
      >
        Subir archivo
        <input type="file" accept=".xlsx, .xls" style="display: none" @change="handleFileUpload" />
      </label>
      <div class="justify-end">
        <button
          v-if="Object.keys(sheetsData).length"
          class="inline-block rounded bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
          @click="exportToXML(store.dataSamples)"
        >
          Exportar a XML

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="inline ml-1 pb-[2px] w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="Object.keys(sheetsData).length">
      <div v-for="(sheetData, sheetName) in sheetsData" :key="sheetName" class="p-5">
        <h3 class="pl-3 font-extrabold">{{ sheetData[3].__EMPTY_4 }}</h3>
        <h3 class="pl-3 font-bold">{{ sheetName }}</h3>
        <div class="overflow-x-auto">
          <!-- tabla de RUTINA -->
          <table
            v-if="sheetData.length && sheetName.startsWith('Rutina')"
            class="min-w-full bg-white border border-gray-200 table-xs"
          >
            <thead>
              <tr v-for="(row, index) in sheetData.slice(5, 6)" :key="index" >
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[0]] }}
                </th>
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[1]] }}
                </th>
                <th colspan="3" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[2]] }}
                </th>
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[5]] }}
                </th>
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[6]] }}
                </th>
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[7]] }}
                </th>
                <th colspan="3" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[8]] }}
                </th>
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[11]] }}
                </th>
                <th colspan="1" class="px-4 py-2 border-b text-center">
                  {{ row[getHeaders(sheetData)[12]] }}
                </th>
              </tr>
              <tr v-for="(row, index) in sheetData.slice(6, 7)" :key="index">
                <th
                  v-for="header in getHeaders(sheetData)"
                  :key="header"
                  class="px-4 py-2 border-b text-center"
                >
                  {{ row[header] }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in sheetData.slice(8)" :key="index" class="hover:bg-gray-100">
                <td
                  v-for="header in getHeaders(sheetData)"
                  :key="header"
                    class="px-4 py-2 border-b text-sm text-gray-700 text-right"
                >
                  {{ row[header] }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- tabla de OPERACIONAL -->
          <table
            v-if="sheetData.length && sheetName.startsWith('Operacional')"
            class="min-w-full bg-white border border-gray-200 table-xs"
          >
            <thead>
              <tr v-for="(row, index) in sheetData.slice(5, 7)" :key="index">
                <th
                  v-for="header in getHeaders(sheetData).slice(0, 10)"
                  :key="header"
                  class="px-4 py-2 border-b"
                >
                  {{ row[header] }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in sheetData.slice(8)" :key="index" class="hover:bg-gray-100">
                <td
                  v-for="header in getHeaders(sheetData).slice(0, 10)"
                  :key="header"
                  class="px-4 py-2 border-b"
                >
                  {{ row[header] }}
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Esta hoja está vacía</p>
        </div>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
 
</LayoutAuthenticated>
</template>

<style scoped>
.error {
  color: red;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  border: 2px solid #ddd;
  padding: 8px;
  
}
th {
  background-color: #f2f2f2;
}
h3 {
  margin-top: 20px;
}
</style>
