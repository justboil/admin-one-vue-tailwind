<script setup>
import { ref, computed, watch } from 'vue'
import { usePlantasStore } from '@/stores/plantas'
import BaseButtons from './BaseButtons.vue'
import BaseButton from './BaseButton.vue'
import {
  mdiAlertCircleOutline,
  mdiChevronDown,
  mdiChevronLeft,
  mdiMapMarker,
  mdiPencil,
  mdiTrashCan,
  mdiFilterRemove
} from '@mdi/js'
import BaseIcon from './BaseIcon.vue'
import CardBoxModal from './CardBoxModal.vue'
import CardBoxModalForm from './CardBoxModalForm.vue'
import FormControl from './FormControl.vue'
import FormField from './FormField.vue'
import BaseLevel from './BaseLevel.vue'
// import { anularUO as anularZona, createUO, updateUO } from '@/services/uo'
import FormZona from './FormZona.vue'
import { createZona, anularZona, updateZona } from '@/services/zonas'
import FlagIcons from './FlagIcons.vue'

defineProps({
  checkable: {
    type: Boolean,
    default: false
  }
})

const plantaStore = usePlantasStore()

// Variables para filtros
const filters = ref({
  nombre: '',
  unidadOperativa: '',
  comunidadAutonoma: ''
})

// Función para limpiar filtros
const clearFilters = () => {
  filters.value.nombre = ''
  filters.value.unidadOperativa = ''
  filters.value.comunidadAutonoma = ''
}

// Opciones para los selectores
const unidadesOperativasOptions = computed(() => {
  const options = [{ value: '', label: 'Todas las unidades operativas' }]
  plantaStore.getUnidadesOperativas.forEach(uo => {
    options.push({ value: uo.id, label: uo.name })
  })
  return options
})

const comunidadesAutonomasOptions = computed(() => {
  const options = [{ value: '', label: 'Todas las comunidades autónomas' }]
  plantaStore.getComunidadesAutonomas.forEach(comunidad => {
    options.push({ value: comunidad.id, label: comunidad.name })
  })
  return options
})

// Computed para filtrar zonas
const zonasFiltradas = computed(() => {
  let zonas = plantaStore.getZonas.filter((zona) => zona.activa)
  
  // Filtrar por nombre
  if (filters.value.nombre) {
    zonas = zonas.filter(zona => 
      zona.name.toLowerCase().includes(filters.value.nombre.toLowerCase())
    )
  }
  
  // Filtrar por unidad operativa
  if (filters.value.unidadOperativa) {
    const uoId = (typeof filters.value.unidadOperativa === 'object' && filters.value.unidadOperativa.value !== undefined) 
      ? filters.value.unidadOperativa.value 
      : filters.value.unidadOperativa
    
    if (uoId !== '' && uoId !== null) {
      zonas = zonas.filter(zona => zona.unidades_operativas_fk == uoId)
    }
  }
  
  // Filtrar por comunidad autónoma
  if (filters.value.comunidadAutonoma) {
    const comunidadId = (typeof filters.value.comunidadAutonoma === 'object' && filters.value.comunidadAutonoma.value !== undefined) 
      ? filters.value.comunidadAutonoma.value 
      : filters.value.comunidadAutonoma
    
    if (comunidadId !== '' && comunidadId !== null) {
      zonas = zonas.filter(zona => zona.com_autonoma_fk == comunidadId)
    }
  }
  
  return zonas
})

const zonasAbastecimiento = computed(() => zonasFiltradas.value)

const isModalDangerActive = ref(false)
const dataToEdit = ref(null)
const isModalOpen = ref(false)

const expandedRows = ref([])

const comunidadPorId = (id) => {
  return (
    plantaStore.getComunidadesAutonomas.find((comunidad) => comunidad.id === id)?.name ??
    'Sin Comunidad Asignada'
  )
}

const unidadOperativaPorId = (id) => {
  return (
    plantaStore.getUnidadesOperativas.find((uo) => uo.id === id)?.name ??
    'Sin Unidad Operativa Asignada'
  )
}

const puntosMuestreoPorZona = (idZona) => {
  return plantaStore.getPuntosMuestreo
    .filter((pMuestreo) => pMuestreo.zona_fk === idZona)
    .map((punto) => {
      return {
        name: punto.name,
        id: punto.id
      }
    })
}

const toggleExpand = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

const openModal = (zona) => {
  dataToEdit.value = zona
  console.log('openModal:', dataToEdit.value)
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  dataToEdit.value = null
}

const anularZonaSeleccionada = (zona) => {
  dataToEdit.value = zona
  isModalDangerActive.value = true
}

const handleDeleteZona = async () => {
  try {
    const id = dataToEdit.value.id
    await anularZona(id)
    await plantaStore.loadZonas()
    isModalDangerActive.value = false
    dataToEdit.value = null
    alert('Zona de Abastecimiento eliminada correctamente')
  } catch (error) {
    console.log('error al borrar Zona de Abastecimiento: ', error)
    alert('error al borrar Zona de Abastecimiento: ')
  }
}

const saveForm = async (form) => {
  //  console.log("ESCRITO Y HECHO", form);
  if (form.esNuevo) {
    console.log('Formulario Nuevo:', form.id)
    await createZona(form)
    // form.value=null
  } else {
    console.log('Formulario Editado:', form)
    await updateZona(form)
  }
  await plantaStore.loadZonas()
  closeModal()
}

watch(zonasAbastecimiento, (newValue) => {
  console.log('Zonas de Abastecimiento:', newValue)
})

defineExpose({
  openModal
})
</script>

<template>
  <CardBoxModalForm
    v-if="dataToEdit !== null"
    v-model="isModalOpen"
    :uo="dataToEdit"
    :title="
      dataToEdit?.id
        ? `Editar Zona de Abastecimiento ${dataToEdit?.name}`
        : 'Crear Nueva Zona de Abastecimiento'
    "
    has-cancel
  >
    <FormZona :uo="dataToEdit" @submit="saveForm" @close-modal="closeModal" />
  </CardBoxModalForm>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Eliminar Zona de Abastecimiento"
    button="danger"
    has-cancel
    @confirm="handleDeleteZona"
  >
    <p>
      Esta seguro que desea eliminar la Zona de Abastecimiento
      <b>{{ dataToEdit?.name }}</b
      >?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>

  <!-- Sección de Filtros -->
  <div class="mb-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
    <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Filtros de Búsqueda</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <!-- Filtro por nombre -->
      <FormField label="Buscar por nombre">
        <FormControl
          v-model="filters.nombre"
          placeholder="Nombre de la zona..."
          :icon="mdiMapMarker"
        />
      </FormField>

      <!-- Filtro por unidad operativa -->
      <FormField label="Unidad operativa">
        <FormControl
          v-model="filters.unidadOperativa"
          :options="unidadesOperativasOptions"
          placeholder="Seleccionar unidad operativa..."
        />
      </FormField>

      <!-- Filtro por comunidad autónoma -->
      <FormField label="Comunidad autónoma">
        <FormControl
          v-model="filters.comunidadAutonoma"
          :options="comunidadesAutonomasOptions"
          placeholder="Seleccionar comunidad..."
        />
      </FormField>
    </div>

    <!-- Botones de acción -->
    <BaseLevel class="justify-between">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {{ zonasAbastecimiento.length }} zona(s) de abastecimiento
      </div>
      <BaseButton
        :icon="mdiFilterRemove"
        label="Limpiar filtros"
        color="light"
        outline
        small
        @click="clearFilters"
      />
    </BaseLevel>
  </div>

  <div>
    <table>
      <thead>
        <tr>
          <th />
          <th>ID</th>
          <th>Nombre</th>
          <th>Comunidad Autonoma</th>
          <th>Unidad Operativa</th>

          <th />
        </tr>
      </thead>
      <tbody>
        <template v-for="zona in zonasAbastecimiento" :key="zona.id">
          <tr>
            <!-- <TableCheckboxCell  /> -->
            <td class="border-b-0 lg:w-6 before:hidden">
              <!-- <UserAvatar :username="zona.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> -->
              <!-- debe enviar un string para escribir el avatar -->
            </td>
            <td data-label="ID">
              {{ zona.id }}
            </td>
            <td data-label="Name">
              {{ zona.name }}
            </td>
            <td data-label="Comunidad Autonoma">
              <div class="flex items-center space-x-2">
                <FlagIcons :comunidad="zona.com_autonoma_fk" class="rounded" />
                {{ comunidadPorId(zona.com_autonoma_fk) }}
              </div>
            </td>
            <td data-label="Unidad Operativa">
              {{ unidadOperativaPorId(zona.unidades_operativas_fk) }}
            </td>

            <td>
              <BaseButton
                :icon="expandedRows.includes(zona.id) ? mdiChevronDown : mdiChevronLeft"
                color="info"
                @click="toggleExpand(zona.id)"
              />
            </td>
          </tr>

          <tr v-if="expandedRows.includes(zona.id)" :key="`expanded-${zona.id}`">
            <td />
            <td colspan="3">
              <p class="font-bold">Puntos de Muestreo</p>
              <!-- <template> -->
              <div class="px-4">
                <div
                  v-if="puntosMuestreoPorZona(zona.id).length === 0"
                  class="flex items-center text-gray-500 py-2"
                >
                  <BaseIcon :path="mdiAlertCircleOutline" class="w-5 h-5 mr-2" />
                  <span class="text-sm italic">No hay puntos de muestreo asignados</span>
                </div>

                <ul v-else class="space-y-2">
                  <li
                    v-for="puntoMuestreo in puntosMuestreoPorZona(zona.id)"
                    :key="puntoMuestreo.id"
                    class="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <BaseIcon :path="mdiMapMarker" class="w-5 h-5 mr-2 text-blue-500" />
                    <span class="text-sm">{{ puntoMuestreo.name }}</span>
                  </li>
                </ul>
              </div>
            </td>
            <!-- <td></td>
            <td></td> -->
            <td class="w-1">
              <div class="flex flex-col items-center space-y-2">
                <BaseButtons class="pl-8">
                  <BaseButton
                    :icon="mdiPencil"
                    color="info"
                    @click="openModal({ ...zona, esNuevo: false })"
                  />

                  <BaseButton
                    :icon="mdiTrashCan"
                    color="danger"
                    @click="anularZonaSeleccionada(zona)"
                  />
                </BaseButtons>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
