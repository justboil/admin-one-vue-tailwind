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
const puntosMuestreo = computed(() => plantaStore.getPuntosMuestreo.filter((punto) => punto.activo))

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

watch(puntosMuestreo, (newValue) => {
  console.log('Puntos de Muestreo WATCH:', newValue)
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
</template>

<style scoped></style>
