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
import { createInfraestructura, anularInfraestructura, updateInfraestructura } from '@/services/infraestructuras'
import FormInfraestructura from './FormInfraestructura.vue'

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
  tipo: ''
})

// Función para limpiar filtros
const clearFilters = () => {
  filters.value.nombre = ''
  filters.value.tipo = ''
}


// Opciones para los selectores
const tiposOptions = computed(() => {
  const options = [{ value: '', label: 'Todos los tipos' }]
  plantaStore.getTipoInfraestructura.forEach(tipo => {
    options.push({ value: tipo.id, label: tipo.name })
  })
  return options
})


// Computed para filtrar infraestructuras
const infraestructurasFiltradas = computed(() => {
  let infras = plantaStore.getInfraestructuras.filter((infraestructura) => infraestructura.activo)
  
  // Filtrar por nombre
  if (filters.value.nombre) {
    infras = infras.filter(infra => 
      infra.name.toLowerCase().includes(filters.value.nombre.toLowerCase())
    )
  }
  
  // Filtrar por tipo
  if (filters.value.tipo) {
    const tipoId = (typeof filters.value.tipo === 'object' && filters.value.tipo.value !== undefined) 
      ? filters.value.tipo.value 
      : filters.value.tipo
    
    if (tipoId !== '' && tipoId !== null) {
      infras = infras.filter(infra => infra.type == tipoId)
    }
  }
  
  return infras
})

const infraestructuras = computed(() => infraestructurasFiltradas.value)

const isModalDangerActive = ref(false)
const dataToEdit = ref(null)
const isModalOpen = ref(false)

const expandedRows = ref([])


const getTypeById = (typeId) => {
  const tipoPlanta = plantaStore.getTipoInfraestructura.find((tipo) => tipo.id === typeId)?.name ?? '-'
  return tipoPlanta
}




const puntosMuestreoPorInfraestructura = (idInfraestructura) => {
  return plantaStore.getPuntosMuestreo.filter((pMuestreo) => pMuestreo.infraestructura_fk === idInfraestructura).map((punto) => {
    return {

      name:punto.name,id: punto.id
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
  dataToEdit.value=zona
  console.log('openModal:', dataToEdit.value)
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  dataToEdit.value = null
}

const anularInfraestructuraSeleccionada = (zona) => {
  dataToEdit.value = zona
  isModalDangerActive.value = true
}

const handleDeleteData = async () => {
  try {
    const id = dataToEdit.value.id
    await anularInfraestructura(id)
    await plantaStore.loadInfraestructuras()
    isModalDangerActive.value = false
    dataToEdit.value = null
    alert('Infraestructura eliminada correctamente')
  } catch (error) {
    console.log('error al borrar la Infraestructura: ', error)
    alert('error al borrar la Infraestructura: ')
  }
}

const saveForm = async (form) => {
  //  console.log("ESCRITO Y HECHO", form);
  if (form.esNuevo) {
    console.log('Formulario Nuevo:', form.id);
    await createInfraestructura(form)
    // form.value=null
  
  } else {
    console.log('Formulario Editado:', form);
   await updateInfraestructura(form)
  }
  await plantaStore.loadInfraestructuras()
  closeModal()
  alert('Infraestructura guardada correctamente')
}

watch(infraestructuras, (newValue) => {
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
      dataToEdit?.id ? `Editar Infraestructura ${dataToEdit?.name}` : 'Crear Nueva Infraestructura'
    "
    has-cancel
  >
    <FormInfraestructura :uo="dataToEdit" @submit="saveForm" @close-modal="closeModal" />
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
      <b>{{ dataToEdit?.name }}</b>?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>

  <!-- Sección de Filtros -->
  <div class="mb-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
    <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Filtros de Búsqueda</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <!-- Filtro por nombre -->
      <FormField label="Buscar por nombre">
        <FormControl
          v-model="filters.nombre"
          placeholder="Nombre de la infraestructura..."
          :icon="mdiMapMarker"
        />
      </FormField>

      <!-- Filtro por tipo -->
      <FormField label="Tipo de infraestructura">
        <FormControl
          v-model="filters.tipo"
          :options="tiposOptions"
          placeholder="Seleccionar tipo..."
        />
      </FormField>

    </div>

    <!-- Botones de acción -->
    <BaseLevel class="justify-between">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {{ infraestructuras.length }} infraestructura(s)
      </div>
      <div class="flex gap-2">
        <BaseButton
          :icon="mdiFilterRemove"
          label="Limpiar filtros"
          color="light"
          outline
          small
          @click="clearFilters"
        />
      </div>
    </BaseLevel>
  </div>

  <div>
    <table>
      <thead>
        <tr>
          <th  />
          <th>ID</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Operador</th>

          <th />
        </tr>
      </thead>
      <tbody>
        <template v-for="infraestructura in infraestructuras" :key="infraestructura.id">
          <tr>
            <!-- <TableCheckboxCell  /> -->
            <td class="border-b-0 lg:w-6 before:hidden">
              <!-- <UserAvatar :username="zona.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> -->
              <!-- debe enviar un string para escribir el avatar -->
            </td>
            <td data-label="ID">
              {{ infraestructura.id }}
            </td>
            <td data-label="Name">
              {{ infraestructura.name }}
            </td>
            <td data-label="Tipo">
              {{ getTypeById(infraestructura.type) }}
            </td>
            <td data-label="Operador">
              {{ infraestructura.operador }}
            </td>

            <td>
              <BaseButton
                :icon="expandedRows.includes(infraestructura.id) ? mdiChevronDown : mdiChevronLeft"
                color="info"
                @click="toggleExpand(infraestructura.id)"
              />
            </td>
          </tr>

          <tr v-if="expandedRows.includes(infraestructura.id)" :key="`expanded-${infraestructura.id}`">
            <td />
            <td colspan="3">
              <p class="font-bold">Puntos de Muestreo</p>
              <!-- <template> -->
              <div class="px-4">
                <div
                  v-if="puntosMuestreoPorInfraestructura(infraestructura.id).length === 0"
                  class="flex items-center text-gray-500 py-2"
                >
                  <BaseIcon :path="mdiAlertCircleOutline" class="w-5 h-5 mr-2" />
                  <span class="text-sm italic">No hay puntos de muestreo asignados</span>
                </div>

                <ul v-else class="space-y-2">
                  <li
                    v-for="puntoMuestreo in puntosMuestreoPorInfraestructura(infraestructura.id)"
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
                  <BaseButton :icon="mdiPencil" color="info" @click="openModal({ ...infraestructura, esNuevo:false })" />

                  <BaseButton
                    :icon="mdiTrashCan"
                    color="danger"
                    @click="anularInfraestructuraSeleccionada(infraestructura)"
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
