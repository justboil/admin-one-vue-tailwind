<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { mdiChevronDown, mdiChevronLeft, mdiPencil, mdiTrashCan, mdiRefresh, mdiMagnify, mdiLoading } from '@mdi/js'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import AnaliticsEdit from './AnaliticsEdit.vue'
import CardBoxModal from './CardBoxModal.vue'
import { usePlantasStore } from '../stores/plantas'
import { useLoginStore } from '../stores/login'
import { deleteAnalitica, updateAnaliticabyId } from '@/services/supabase'
import { useServerPagination } from '@/composables/useServerPagination'
import useFormSelectData from '../composables/useFormSelectData'
import { FormKit } from '@formkit/vue'

const checkedRows = ref([])
const plantaStore = usePlantasStore()
const loginStore = useLoginStore()

const ORGANOLEPTIC_CORRECT = 1

const turbidezValues = {
  min: 0,
  max: 4
}
const phValues = {
  min: 6.5,
  max: 9.5
}
const cloroValues = {
  min: 0.4,
  max: 1
}

const analiticaToDelete = ref(null)
const analiticaToEdit = ref(null)
const analiticaToUpdate = ref(null)

const {
  form: localFilters,
  selectZona,
  selectPuntosMuestra,
  selectInfraestructura,
  selectUO,
  operarioPorZona,
  resetForm
} = useFormSelectData()

// Usar el composable de paginación server-side
const {
  loading,
  error,
  data: analitics,
  pagination,
  sorting,
  filters,
  searchText,
  paginationInfo,
  loadData,
  goToPage,
  nextPage,
  previousPage,
  changePageSize,
  toggleSort,
  applyFilters,
  clearFilters,
  search,
  refresh
} = useServerPagination()

defineProps({
  checkable: Boolean
})

defineExpose({ 
  resetForm: () => {
    resetForm()
    clearFilters()
  }, 
  checkedRows, 
  filters: localFilters 
})

const showOnlyWrongValues = ref(false)
const expandedRows = ref([])
const isModalDeleteAnaliticsActive = ref(false)
const isModalActive = ref(false)

// Estados de loading específicos
const refreshing = ref(false)

const toggleExpand = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

// Obtener las zonas del usuario logueado (similar a implementación original)
const userZonas = computed(() => {
  if (loginStore.userRole === 'admin' || loginStore.userRole === 99 || loginStore.userRole === '99') {
    return null
  }

  const operario = plantaStore.getOperarios.find(
    (op) => op.email?.toLowerCase() === loginStore.userEmail?.toLowerCase()
  )
  
  if (!operario) return null
  return operario.zonas || []
})

const getZonaFromAnalitica = (analitica) => {
  const puntoMuestreo = plantaStore.getPuntosMuestreo.find(
    punto => punto.id === analitica.punto_muestreo_fk
  )
  return puntoMuestreo ? puntoMuestreo.zona_fk : null
}

// Páginas para mostrar en el paginador
const pagesList = computed(() => {
  const pages = []
  const current = pagination.page
  const total = pagination.totalPages
  
  // Siempre mostrar primera página
  if (total > 0) pages.push(1)
  
  // Mostrar páginas alrededor de la actual
  const start = Math.max(2, current - 2)
  const end = Math.min(total - 1, current + 2)
  
  if (start > 2) pages.push('...')
  
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) pages.push(i)
  }
  
  if (end < total - 1) pages.push('...')
  
  // Siempre mostrar última página si hay más de 1
  if (total > 1) pages.push(total)
  
  return pages
})

const getNameOperario = (id) => {
  const operario = plantaStore.getOperarios.find((operario) => operario.id === id)
  return operario ? operario.name : 'No asignado'
}

const getPuntoMuestreo = (id) => {
  const puntoMuestreo = plantaStore.getPuntosMuestreo.find(
    (puntoMuestreo) => puntoMuestreo.id === id
  )
  return puntoMuestreo ? puntoMuestreo.name : 'No asignado'
}

const getTipoAnalitica = (id) => {
  switch (id) {
    case 28:
      return 'Operacional'
    case 29:
      return 'Rutina'
    case 99:
      return 'Seguimiento'
    default:
      return 'Desconocido'
  }
}

const allRowsChecked = computed(() => {
  return analitics.value.length > 0 &&
    analitics.value.every((analitica) =>
      checkedRows.value.some((row) => row.id === analitica.id)
    )
})

// Funciones de validación (mantenidas de la implementación original)
const isCloroWrong = (analitica) => {
  if (analitica.cloro === null || analitica.cloro === undefined) return false
  return analitica.cloro < cloroValues.min || analitica.cloro > cloroValues.max
}

const isPhWrong = (analitica) => {
  if (analitica.ph === null || analitica.ph === undefined) return false
  return analitica.ph < phValues.min || analitica.ph > phValues.max
}

const isTurbidezWrong = (analitica) => {
  if (analitica.turbidez === null || analitica.turbidez === undefined) return false
  return analitica.turbidez < turbidezValues.min || analitica.turbidez > turbidezValues.max
}

const isOrganolepticWrong = (organolepticValue) => {
  if (organolepticValue === null || organolepticValue === undefined) return false
  return +organolepticValue === 0
}

const isWrongValues = (analitica) => {
  return isCloroWrong(analitica) ||
    isPhWrong(analitica) ||
    isTurbidezWrong(analitica) ||
    isOrganolepticWrong(analitica.olor) ||
    isOrganolepticWrong(analitica.color) ||
    isOrganolepticWrong(analitica.sabor)
}

const toggleAllRows = (isChecked) => {
  if (isChecked) {
    analitics.value.forEach((analitica) => {
      if (!checkedRows.value.some((row) => row.id === analitica.id)) {
        checkedRows.value.push(analitica)
      }
    })
  } else {
    checkedRows.value = checkedRows.value.filter(
      (row) => !analitics.value.some((analitica) => analitica.id === row.id)
    )
  }
}

const addAnalitica = (analitica, isChecked) => {
  if (isChecked) {
    if (!checkedRows.value.some((row) => row.id === analitica.id)) {
      checkedRows.value.push(analitica)
    }
  } else {
    checkedRows.value = checkedRows.value.filter((item) => item.id !== analitica.id)
  }
}

// Aplicar filtros locales a la paginación server-side
const applyLocalFilters = () => {
  const serverFilters = {
    fecha_inicio: localFilters.fecha_inicio,
    fecha_final: localFilters.fecha_final,
    punto_muestreo_fk: localFilters.punto_muestreo_fk,
    personal_fk: localFilters.operario,
    type: localFilters.type,
    zona_fk: localFilters.zona
  }
  applyFilters(serverFilters)
}

// Funciones de CRUD (mantenidas de la implementación original)
const handleConfirmDelete = async () => {
  try {
    await deleteAnalitica(analiticaToDelete.value.id)
    await refresh() // Usar refresh del composable
    isModalDeleteAnaliticsActive.value = false
    analiticaToDelete.value = null
  } catch (error) {
    console.error('Error al eliminar:', error)
    alert('Error al eliminar la analítica')
  }
}

const handleConfirmUpdate = async () => {
  try {
    if (!analiticaToUpdate.value) {
      throw new Error('No hay analítica para actualizar')
    }
    await updateAnaliticabyId(analiticaToUpdate.value.id, analiticaToUpdate.value)
    await refresh() // Usar refresh del composable
    isModalActive.value = false
    analiticaToEdit.value = null
    analiticaToUpdate.value = null
  } catch (error) {
    console.error('Error al actualizar:', error)
    alert('Error al actualizar la analítica')
  }
}

const closeModal = () => {
  isModalActive.value = false
  analiticaToEdit.value = null
  analiticaToUpdate.value = null
}

const deleteAnaliticaSeleccionada = async (analitica) => {
  analiticaToDelete.value = analitica
  isModalDeleteAnaliticsActive.value = true
}

const updateAnaliticaSeleccionada = async (analitica) => {
  analiticaToEdit.value = JSON.parse(JSON.stringify(analitica))
  
  const today = new Date().toLocaleDateString()
  const nuevoRegistro = `${today} - Modificado por: ${loginStore.userName}\n${analiticaToEdit.value.observaciones}`
  
  if (analiticaToEdit.value.registro) {
    analiticaToEdit.value.registro = `${nuevoRegistro}\n${analiticaToEdit.value.registro}`
  } else {
    analiticaToEdit.value.registro = nuevoRegistro
  }
  
  await nextTick()
  isModalActive.value = true
}

const handleRefresh = async () => {
  refreshing.value = true
  try {
    await refresh()
  } finally {
    refreshing.value = false
  }
}

const handleSort = (column) => {
  toggleSort(column)
}

// Watch para aplicar filtros cuando cambien los filtros locales
const debouncedApplyFilters = (() => {
  let timeoutId
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(applyLocalFilters, 300)
  }
})()

// Observar cambios en filtros locales
const stopWatching = []
Object.keys(localFilters).forEach(key => {
  const stopWatcher = watch(
    () => localFilters[key],
    () => debouncedApplyFilters(),
    { deep: true }
  )
  stopWatching.push(stopWatcher)
})

onMounted(() => {
  resetForm()
  loadData()
})
</script>

<template>
  <CardBoxModal
    v-model="isModalDeleteAnaliticsActive"
    title="Desea Borrar la Analítica?"
    button="danger"
    has-cancel
    @confirm="handleConfirmDelete"
  >
    <p>Si confirma la analitica se borrara <b>definitivamente</b></p>
    <p>Esta seguro de ejecutar esta acción?</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalActive"
    title="Actualizar analítica"
    has-cancel
    @confirm="handleConfirmUpdate"
    @cancel="closeModal"
  >
    <AnaliticsEdit
      v-if="analiticaToEdit"
      :analitic="analiticaToEdit"
      @update="analiticaToUpdate = $event"
    />
    <p class="text-red-600 font-bold">ATENCIÓN:</p>
    <p>
      La modificacion de esta analítica será <b>definitiva</b> y se realizará bajo su propia
      responsabilidad
    </p>
  </CardBoxModal>

  <!-- Controles superiores -->
  <div class="mb-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <BaseButton
          :icon="refreshing ? mdiLoading : mdiRefresh"
          :color="refreshing ? 'info' : 'success'"
          :disabled="refreshing || loading"
          small
          @click="handleRefresh"
        />
        <span class="text-sm text-gray-600">
          {{ loading ? 'Cargando...' : `${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.total} registros` }}
        </span>
      </div>
      
      <div class="flex items-center gap-2">
        <label class="text-sm">Registros por página:</label>
        <select 
          :value="pagination.pageSize" 
          class="border rounded px-2 py-1 text-sm"
          :disabled="loading"
          @change="changePageSize(parseInt($event.target.value))"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Filtros -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <FormKit
      v-model="localFilters.fecha_inicio"
      type="date"
      placeholder="Fecha Inicio"
      label="Fecha Inicio"
      :disabled="loading"
    />
    <FormKit
      v-model="localFilters.fecha_final"
      type="date"
      placeholder="Fecha Final"
      label="Fecha Final"
      :disabled="loading"
    />
    <FormKit
      v-model="localFilters.uo"
      type="select"
      :options="selectUO"
      placeholder="Unidad Operativa"
      label="Unidad Operativa"
      :disabled="loading"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
    <FormKit
      v-model="localFilters.zona"
      type="select"
      :options="selectZona"
      placeholder="Zona de Muestra"
      label="Zona"
      :disabled="loading"
    />
    <FormKit
      v-model="localFilters.infraestructura"
      type="select"
      :options="selectInfraestructura"
      placeholder="Infraestructura"
      label="Infraestructura"
      :disabled="loading"
    />
    <FormKit
      v-model="localFilters.punto_muestreo_fk"
      type="select"
      :options="selectPuntosMuestra"
      placeholder="Punto de muestra"
      label="Punto de Muestra"
      :disabled="loading"
    />
    <FormKit
      v-model.number="localFilters.operario"
      type="select"
      :options="operarioPorZona"
      placeholder="Operario"
      label="Operario"
      :disabled="loading"
    />
  </div>

  <!-- Error state -->
  <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    Error cargando datos: {{ error.message }}
    <BaseButton 
      label="Reintentar" 
      color="danger" 
      small 
      class="ml-2"
      @click="refresh"
    />
  </div>

  <!-- Loading overlay para la tabla -->
  <div class="relative">
    <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded">
      <div class="flex items-center gap-2">
        <BaseIcon :path="mdiLoading" class="animate-spin" />
        <span>Cargando datos...</span>
      </div>
    </div>

    <table class="w-full" :class="{ 'opacity-50': loading }">
      <thead>
        <tr>
          <th v-if="checkable" class="text-center">
            <TableCheckboxCell 
              :model-value="allRowsChecked" 
              :disabled="loading || analitics.length === 0"
              @update:model-value="toggleAllRows"
            />
          </th>
          <th class="cursor-pointer" @click="!loading && handleSort('fecha')">
            Fecha 
            <span v-if="sorting.sortBy === 'fecha'">
              {{ sorting.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th class="cursor-pointer" @click="!loading && handleSort('punto_muestreo_fk')">
            Punto Muestreo 
            <span v-if="sorting.sortBy === 'punto_muestreo_fk'">
              {{ sorting.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th class="cursor-pointer" @click="!loading && handleSort('personal_fk')">
            Operario
            <span v-if="sorting.sortBy === 'personal_fk'">
              {{ sorting.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th class="cursor-pointer" @click="!loading && handleSort('type')">
            Tipo
            <span v-if="sorting.sortBy === 'type'">
              {{ sorting.sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th class="text-center">
            <TableCheckboxCell
              :model-value="showOnlyWrongValues"
              label="Solo valores incorrectos"
              :disabled="loading"
              @update:model-value="showOnlyWrongValues = $event"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="analitica in analitics" :key="analitica.id">
          <tr>
            <TableCheckboxCell
              v-if="checkable"
              :model-value="checkedRows.includes(analitica)"
              :disabled="loading"
              @update:model-value="(isChecked) => addAnalitica(analitica, isChecked)"
            />

            <td data-label="Fecha">
              {{ analitica.fecha }}
            </td>
            <td data-label="Punto de Muestreo">
              {{ getPuntoMuestreo(analitica.punto_muestreo_fk) }}
            </td>
            <td data-label="Persona">
              {{ getNameOperario(analitica.personal_fk) }}
            </td>
            <td data-label="Tipo Analítica" class="lg:w-32">
              {{ getTipoAnalitica(analitica.type) }}
            </td>

            <td>
              <BaseButton
                :icon="expandedRows.includes(analitica.id) ? mdiChevronDown : mdiChevronLeft"
                :color="isWrongValues(analitica) ? 'danger' : 'info'"
                :disabled="loading"
                @click="toggleExpand(analitica.id)"
              />
            </td>
          </tr>
          <tr v-if="expandedRows.includes(analitica.id)" :key="`expanded-${analitica.id}`">
            <td colspan="5" class="lg:w-1">
              <p><strong>Información adicional:</strong></p>

              <div class="flex justify-center gap-40">
                <div>
                  <li class="text-gray-600">
                    <span
                      class="font-semibold text-lg text-gray-700"
                      :class="{ 'text-red-500 underline': isCloroWrong(analitica) }"
                    >Cloro:</span>
                    {{ analitica.cloro ? analitica.cloro + ' mg/l' : 'Sin muestra' }}
                  </li>
                  <li class="text-gray-600">
                    <span
                      class="font-semibold text-lg text-gray-700"
                      :class="{ 'text-red-500 underline': isPhWrong(analitica) }"
                    >pH:</span>
                    {{ analitica.ph ? analitica.ph + ' ud' : 'Sin Muestra' }}
                  </li>
                  <li class="text-gray-600">
                    <span
                      class="font-semibold text-lg text-gray-700"
                      :class="{ 'text-red-500 underline': isTurbidezWrong(analitica) }"
                    >Turbidez:</span>
                    {{ analitica.turbidez ? analitica.turbidez + ' UNT' : 'Sin Muestra' }}
                  </li>
                </div>
                <div v-if="analitica.type === 29">
                  <li class="text-gray-600">
                    <span
                      class="font-semibold text-lg text-gray-700"
                      :class="{ 'text-red-500 underline': isOrganolepticWrong(analitica.olor) }"
                    >Olor:</span>
                    {{ analitica.olor === ORGANOLEPTIC_CORRECT ? 'Correcto' : 'Incorrecto' }}
                  </li>
                  <li class="text-gray-600">
                    <span
                      class="font-semibold text-lg text-gray-700"
                      :class="{ 'text-red-500 underline': isOrganolepticWrong(analitica.color) }"
                    >Color:</span>
                    {{ analitica.color === ORGANOLEPTIC_CORRECT ? 'Correcto' : 'Incorrecto' }}
                  </li>
                  <li class="text-gray-600">
                    <span
                      class="font-semibold text-lg text-gray-700"
                      :class="{ 'text-red-500 underline': isOrganolepticWrong(analitica.sabor) }"
                    >Sabor:</span>
                    {{ analitica.sabor === ORGANOLEPTIC_CORRECT ? 'Correcto' : 'Incorrecto' }}
                  </li>
                </div>
              </div>
              <li class="ml-4">
                <span class="text-gray-800 font-semibold">Observaciones: </span>
                {{ analitica.observaciones }}
              </li>
            </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <BaseButtons>
                <BaseButton
                  color="info"
                  :icon="mdiPencil"
                  small
                  :disabled="loading"
                  @click="updateAnaliticaSeleccionada(analitica)"
                />
                <BaseButton
                  color="danger"
                  :icon="mdiTrashCan"
                  small
                  :disabled="loading"
                  @click="deleteAnaliticaSeleccionada(analitica)"
                />
              </BaseButtons>
            </td>
          </tr>
        </template>

        <!-- Empty state -->
        <tr v-if="!loading && analitics.length === 0">
          <td :colspan="checkable ? 6 : 5" class="text-center py-8 text-gray-500">
            No se encontraron analíticas con los filtros aplicados
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Paginación -->
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          label="Anterior"
          color="whiteDark"
          small
          :disabled="!pagination.hasPreviousPage || loading"
          @click="previousPage"
        />
        <template v-for="page in pagesList" :key="page">
          <BaseButton
            v-if="page !== '...'"
            :label="page.toString()"
            :color="page === pagination.page ? 'lightDark' : 'whiteDark'"
            small
            :disabled="loading"
            @click="goToPage(page)"
          />
          <span v-else class="px-2 py-1 text-sm">...</span>
        </template>
        <BaseButton
          label="Siguiente"
          color="whiteDark"
          small
          :disabled="!pagination.hasNextPage || loading"
          @click="nextPage"
        />
      </BaseButtons>
      
      <div class="text-sm text-gray-600">
        <div>{{ paginationInfo.from }}-{{ paginationInfo.to }} de {{ paginationInfo.total }}</div>
        <div>Página {{ paginationInfo.currentPage }} de {{ paginationInfo.totalPages }}</div>
      </div>
    </BaseLevel>
  </div>
</template>

<style scoped>
table {
  @apply min-w-full divide-y divide-gray-200;
}

thead th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50;
}

tbody td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}

tbody tr:nth-child(even) {
  @apply bg-gray-50;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>