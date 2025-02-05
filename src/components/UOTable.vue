<script setup>
import { ref, computed, watch } from 'vue'
import { usePlantasStore } from '@/stores/plantas'
import UserAvatar from './UserAvatar.vue'
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
import FormUO from './FormUO.vue'
import CardBoxModalForm from './CardBoxModalForm.vue'
import { anularUO } from '@/services/uo'


 defineProps({
  checkable: {
    type: Boolean,
    default: false
  }
})

const plantaStore = usePlantasStore()
const unidadesOperativas = computed(() => plantaStore.unidadesOperativas.filter(uo => uo.activo))



const isModalDangerActive = ref(false)
const uoToEdit = ref(null)
const isModalOpen = ref(false)

const expandedRows = ref([])

const zonasPorUO = (idUO) => {
  return plantaStore.getZonas.filter((zona) => zona.unidades_operativas_fk === idUO)
}

const toggleExpand = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

const openModal = (uo) => {
    uoToEdit.value = uo;
    isModalOpen.value = true;
}

const closeModal = () => {
    isModalOpen.value = false;
    uoToEdit.value = null;
}

const anularUOSeleccionada = (uo) => {
  uoToEdit.value = uo
  isModalDangerActive.value = true
}

const handleDeleteUO = async () => {

    try {
        const id = uoToEdit.value.id
        anularUO(id)
        isModalDangerActive.value = false
        uoToEdit.value = null
        alert('Unidad Operativa eliminada correctamente')
        
    }catch(error){
        alert('error al borrar UO: ', error)
    }
//   try {
//     const id = operarioSeleccionado.value.id
//     await deleteOperario(id)
//     await plantaStore.loadOperarios()
//     isModalDangerActive.value = false
//     operarioSeleccionado.value = null
//     alert('Operario eliminado correctamente')
//   } catch (error) {
//     alert('Error al borrar operario')
//     console.log('error al borrar operario: ', error)
//   }
}

const saveForm = (form) => {
 console.log("ESCRITO Y HECHO", form);
}

watch(unidadesOperativas, (newValue) => {
  console.log('Unidades Operativas:', newValue)
})
</script>

<template>

<CardBoxModalForm 
    v-if="uoToEdit !== null"
    v-model="isModalOpen"
    :uo="uoToEdit"
    :title="`Editar Unidad Operativa ${uoToEdit?.description}`"
    has-cancel
    >
  <FormUO :uo="uoToEdit" @submit="saveForm" @close-modal="closeModal"/>
  </CardBoxModalForm>

  

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Eliminar Unidad Operativa"
    button="danger"
    has-cancel
    @confirm="handleDeleteUO"
  >
    <p>
      Esta seguro que desea eliminar la Unidad Operativa <b>{{ uoToEdit?.name }} ({{ uoToEdit?.description }})</b
      >?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>




  <div>
    <table>
      <thead>
        <tr>
          <!-- <th  /> -->
          <th>ID</th>
          <th>Código</th>
          <th>Nombre</th>

          <th />
        </tr>
      </thead>
      <tbody>
        <template v-for="uo in unidadesOperativas" :key="uo.id">
          <tr>
            <!-- <TableCheckboxCell  /> -->
            <td class="border-b-0 lg:w-6 before:hidden">
             <UserAvatar :username="uo.name.slice(-2)" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> <!-- debe enviar un string para escribir el avatar -->
            </td>
            <td data-label="Code">
              {{ uo.name }}
            </td>
            <td data-label="Name">
              {{ uo.description }}
            </td>

            <td>
              <BaseButton
                :icon="expandedRows.includes(uo.id) ? mdiChevronDown : mdiChevronLeft"
                color="info"
                @click="toggleExpand(uo.id)"
              />
            </td>
          </tr>

          <tr v-if="expandedRows.includes(uo.id)" :key="`expanded-${uo.id}`">
            <td />
            <td colspan="2">
              <p class="font-bold">Zonas</p>
              <!-- <template> -->
              <div class="px-4">
                <div
                  v-if="zonasPorUO(uo.id).length === 0"
                  class="flex items-center text-gray-500 py-2"
                >
                  <BaseIcon :path="mdiAlertCircleOutline" class="w-5 h-5 mr-2" />
                  <span class="text-sm italic">No hay zonas asignadas</span>
                </div>

                <ul v-else class="space-y-2">
                  <li
                    v-for="zona in zonasPorUO(uo.id)"
                    :key="zona.id"
                    class="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <BaseIcon :path="mdiMapMarker" class="w-5 h-5 mr-2 text-blue-500" />
                    <span class="text-sm">{{ zona.name }}</span>
                  </li>
                </ul>
              </div>
            </td>
            <td class="w-1">
              <div class="flex flex-col items-center space-y-2">
                <BaseButtons class="pl-8">
                  <BaseButton :icon="mdiPencil" color="info" @click="openModal(uo)" />           
                
                  <BaseButton :icon="mdiTrashCan" color="danger" @click="anularUOSeleccionada(uo)" />
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
