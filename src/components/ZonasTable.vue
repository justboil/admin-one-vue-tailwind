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
  mdiTrashCan
} from '@mdi/js'
import BaseIcon from './BaseIcon.vue'
import CardBoxModal from './CardBoxModal.vue'
import CardBoxModalForm from './CardBoxModalForm.vue'
import { anularUO, createUO, updateUO } from '@/services/uo'
import FormZona from './FormZona.vue'
import { createZona } from '@/services/zonas'

defineProps({
  checkable: {
    type: Boolean,
    default: false
  }
})

const plantaStore = usePlantasStore()
const zonasAbastecimiento = computed(() => plantaStore.getZonas.filter((zona) => zona.activa))

const isModalDangerActive = ref(false)
const dataToEdit = ref(null)
const isModalOpen = ref(false)

const expandedRows = ref([])


const comunidadPorId = (id) => {
  return plantaStore.getComunidadesAutonomas.find((comunidad) => comunidad.id === id)?.name ?? 'Sin Comunidad Asignada'
}

const unidadOperativaPorId = (id) => {
  return plantaStore.getUnidadesOperativas.find((uo) => uo.id === id)?.name ?? 'Sin Unidad Operativa Asignada'
  
}


const puntosMuestreoPorZona = (idZona) => {
  return plantaStore.getPuntosMuestreo.filter((pMuestreo) => pMuestreo.zona_fk === idZona).map((punto) => {
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

const anularZonaSeleccionada = (zona) => {
  dataToEdit.value = zona
  isModalDangerActive.value = true
}

const handleDeleteUO = async () => {
  try {
    const id = dataToEdit.value.id
    await anularUO(id)
    await plantaStore.loadUnidadesOperativas()
    isModalDangerActive.value = false
    dataToEdit.value = null
    alert('Unidad Operativa eliminada correctamente')
  } catch (error) {
    console.log('error al borrar UO: ', error)
    alert('error al borrar UO: ')
  }
}

const saveForm = async (form) => {
  //  console.log("ESCRITO Y HECHO", form);
  if (form.esNuevo) {
    console.log('Formulario Nuevo:', form.id);
    await createZona(form)
    // form.value=null
  
  } else {
    console.log('Formulario Editado:', form);
   await updateUO(form)
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
      dataToEdit?.id ? `Editar Zona de Abastecimiento ${dataToEdit?.name}` : 'Crear Nueva Zona de Abastecimiento'
    "
    has-cancel
  >
    <FormZona :uo="dataToEdit" @submit="saveForm" @close-modal="closeModal" />
  </CardBoxModalForm>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Eliminar Unidad Operativa"
    button="danger"
    has-cancel
    @confirm="handleDeleteUO"
  >
    <p>
      Esta seguro que desea eliminar la Unidad Operativa
      <b>{{ dataToEdit?.name }} ({{ dataToEdit?.description }})</b>?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>

  <div>
    <table>
      <thead>
        <tr>
          <th  />
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
              {{ comunidadPorId(zona.com_autonoma_fk) }}
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
                  <BaseButton :icon="mdiPencil" color="info" @click="openModal({ ...zona, esNuevo:false })" />

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
