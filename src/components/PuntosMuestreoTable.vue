<script setup>
import { ref, computed, watch, onMounted } from 'vue'
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
import {
  createInfraestructura,
  anularInfraestructura,
  updateInfraestructura
} from '@/services/infraestructuras'
import FormInfraestructura from './FormInfraestructura.vue'
import FormPuntoMuestreo from './FormPuntoMuestreo.vue'
import { anularPuntoMuestreo, createPuntoMuestreo, updatePuntoMuestreo } from '@/services/puntosMuestreo'

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
  zona: '',
  infraestructura: ''
})

// Funciones para limpiar filtros
const clearFilters = () => {
  filters.value.nombre = ''
  filters.value.zona = ''
  filters.value.infraestructura = ''
}


// Computed para filtrar puntos de muestreo
const puntosMuestreoFiltrados = computed(() => {
  let puntos = plantaStore.getPuntosMuestreo.filter((punto) => punto.activo)
  
  // Filtrar por nombre
  if (filters.value.nombre) {
    puntos = puntos.filter(punto => 
      punto.name.toLowerCase().includes(filters.value.nombre.toLowerCase())
    )
  }
  
  // Filtrar por zona
  if (filters.value.zona) {
    const zonaId = (typeof filters.value.zona === 'object' && filters.value.zona.value !== undefined) 
      ? filters.value.zona.value 
      : filters.value.zona
    
    if (zonaId !== '' && zonaId !== null) {
      puntos = puntos.filter(punto => punto.zona_fk == zonaId)
    }
  }
  
  // Filtrar por infraestructura
  if (filters.value.infraestructura) {
    const infraId = (typeof filters.value.infraestructura === 'object' && filters.value.infraestructura.value !== undefined) 
      ? filters.value.infraestructura.value 
      : filters.value.infraestructura
    
    if (infraId !== '' && infraId !== null) {
      puntos = puntos.filter(punto => punto.infraestructura_fk == infraId)
    }
  }
  
  return puntos
})

// Opciones para los filtros
const zonasOptions = computed(() => {
  const options = [{ value: '', label: 'Todas las zonas' }]
  
  // Crear un Set para evitar duplicados basándose en zona_fk de los puntos
  const zonasEnUso = new Set()
  plantaStore.getPuntosMuestreo.forEach(punto => {
    if (punto.zona_fk) zonasEnUso.add(punto.zona_fk)
  })
  
  // Agregar solo las zonas que tienen puntos asociados
  Array.from(zonasEnUso).forEach(zonaId => {
    const zona = plantaStore.getZonas.find(z => z.id === zonaId)
    if (zona) {
      options.push({ value: zonaId, label: zona.name })
    }
  })
  
  return options
})

const infraestructurasOptions = computed(() => {
  const options = [{ value: '', label: 'Todas las infraestructuras' }]
  
  // Crear un Set para evitar duplicados basándose en infraestructura_fk de los puntos
  const infrasEnUso = new Set()
  plantaStore.getPuntosMuestreo.forEach(punto => {
    if (punto.infraestructura_fk) infrasEnUso.add(punto.infraestructura_fk)
  })
  
  // Agregar solo las infraestructuras que tienen puntos asociados
  Array.from(infrasEnUso).forEach(infraId => {
    const infra = plantaStore.getInfraestructuras.find(i => i.id === infraId)
    if (infra) {
      options.push({ value: infraId, label: infra.name })
    }
  })
  
  return options
})

const puntosMuestreo = computed(() => puntosMuestreoFiltrados.value)
const isLoading = ref(true)

const isModalDangerActive = ref(false)
const dataToEdit = ref(null)
const isModalOpen = ref(false)

const expandedRows = ref([])

const getInfraestructuraById = (infrId) => {
  return (
    plantaStore.getInfraestructuras.find((infraestructura) => infraestructura.id === infrId)
      ?.name ?? '-'
  )
}

const getZonaById = (zonaId) => {
  return plantaStore.getZonas.find((zona) => zona.id === zonaId)?.name ?? '-'
}

const puntosMuestreoPorInfraestructura = (idInfraestructura) => {
  return plantaStore.getPuntosMuestreo
    .filter((pMuestreo) => pMuestreo.infraestructura_fk === idInfraestructura)
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

const anularPuntoMuestreoSeleccionado = (zona) => {
  dataToEdit.value = zona
  isModalDangerActive.value = true
}

const handleDeleteData = async () => {
  try {
    const id = dataToEdit.value.id
    await anularPuntoMuestreo(id)
    await plantaStore.loadPuntosMuestreo()
    isModalDangerActive.value = false
    dataToEdit.value = null
    alert('Punto de Muestreo eliminado correctamente')
  } catch (error) {
    console.log('error al borrar el Punto de Muestreo: ', error)
    alert('error al borrar el Punto de Muestreo: ', error)
  }
}

const saveForm = async (form) => {
  //  console.log("ESCRITO Y HECHO", form);
  if (form.esNuevo) {
    console.log('Formulario Nuevo:', form.id)
    await createPuntoMuestreo(form)
    // form.value=null
  } else {
    console.log('Formulario Editado:', form)
    await updatePuntoMuestreo(form)
  }
  await plantaStore.loadPuntosMuestreo()
  closeModal()
  alert('Punto de Muestreo guardado correctamente')
}

// Cargar datos iniciales
onMounted(async () => {
  try {
    await plantaStore.loadPuntosMuestreo()
    isLoading.value = false
  } catch (error) {
    console.error('Error al cargar puntos de muestreo:', error)
  }
})

watch(puntosMuestreo, (newValue) => {
  console.log('Puntos de Muestreo WATCH:', newValue)
})

defineExpose({
  openModal
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center p-4">
    <span class="text-gray-500">Cargando datos...</span>
  </div>
  <div v-else>
    <!-- Sección de Filtros -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
      <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Filtros de Búsqueda</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <!-- Filtro por nombre -->
        <FormField label="Buscar por nombre">
          <FormControl
            v-model="filters.nombre"
            placeholder="Nombre del punto de muestreo..."
            :icon="mdiMapMarker"
          />
        </FormField>

        <!-- Filtro por zona -->
        <FormField label="Zona">
          <FormControl
            v-model="filters.zona"
            :options="zonasOptions"
            placeholder="Seleccionar zona..."
          />
        </FormField>

        <!-- Filtro por infraestructura -->
        <FormField label="Infraestructura">
          <FormControl
            v-model="filters.infraestructura"
            :options="infraestructurasOptions"
            placeholder="Seleccionar infraestructura..."
          />
        </FormField>
      </div>

      <!-- Botones de acción -->
      <BaseLevel class="justify-between">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {{ puntosMuestreo.length }} punto(s) de muestreo
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

    <!-- Modales -->
    <CardBoxModalForm
    v-if="dataToEdit !== null"
    v-model="isModalOpen"
    :uo="dataToEdit"
    :title="dataToEdit?.id ? `Editar Punto Muestreo ${dataToEdit?.name}` : 'Crear Punto Muestreo'"
    has-cancel
  >
    <FormPuntoMuestreo :uo="dataToEdit" @submit="saveForm" @close-modal="closeModal" />
  </CardBoxModalForm>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Eliminar Infraestructura"
    button="danger"
    has-cancel
    @confirm="handleDeleteData"
  >
    <p>
      Esta seguro que desea eliminar la Infraestructura
      <b>{{ dataToEdit?.name }}</b
      >?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>

  <div>
    <table>
      <thead>
        <tr>
          <th />
          <th>ID</th>
          <th>Nombre</th>
          <th>Infraestructura</th>
          <th>Zona</th>

          <th />
        </tr>
      </thead>
      <tbody>
        <template v-for="punto in puntosMuestreo" :key="punto.id">
          <tr>
            <!-- <TableCheckboxCell  /> -->
            <td class="border-b-0 lg:w-6 before:hidden">
              <!-- <UserAvatar :username="zona.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> -->
              <!-- debe enviar un string para escribir el avatar -->
            </td>
            <td data-label="ID">
              {{ punto.id }}
            </td>
            <td data-label="Name">
              {{ punto.name }}
            </td>
            <td data-label="Tipo">
              {{ getInfraestructuraById(punto.infraestructura_fk) }}
            </td>
            <td data-label="Operador">
              {{ getZonaById(punto.zona_fk) }}
            </td>

            <td>
              <div class="flex flex-col items-center space-y-2">
                <BaseButtons class="pl-8">
                  <BaseButton
                    :icon="mdiPencil"
                    color="info"
                    @click="openModal({ ...punto, esNuevo: false })"
                  />

                  <BaseButton
                    :icon="mdiTrashCan"
                    color="danger"
                    @click="anularPuntoMuestreoSeleccionado(punto)"
                  />
                </BaseButtons>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped></style>
