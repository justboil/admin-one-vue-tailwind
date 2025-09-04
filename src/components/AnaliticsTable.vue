<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
// import { useMainStore } from '@/stores/main'
import { mdiChevronDown, mdiChevronLeft, mdiPencil, mdiTrashCan } from '@mdi/js'
// import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import AnaliticsEdit from './AnaliticsEdit.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import { usePlantasStore } from '../stores/plantas'
import { useLoginStore } from '../stores/login'
// import { getAnaliticas } from '@/services/analiticas'
import useFormSelectData from '../composables/useFormSelectData'
import { FormKit } from '@formkit/vue'
const checkedRows = ref([])
import { deleteAnalitica, updateAnaliticabyId } from '@/services/supabase'
import CardBoxModal from './CardBoxModal.vue'

const plantaStore = usePlantasStore()
const loginStore = useLoginStore()

const ORGANOLEPTIC_CORRECT = 1
// const ORGANOLEPTIC_WRONG = 0

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
const sortKey = ref('')
const sortDir = ref('asc')

const {
  form: filters,
  selectZona,
  selectPuntosMuestra,
  selectInfraestructura,
  selectUO,
  operarioPorZona,
  resetForm
} = useFormSelectData()

defineProps({
  checkable: Boolean
})

defineExpose({ resetForm, checkedRows, filters })

// const selectedAnaliticas = ref([])
// const headerChecked = ref(false)
// const checkboxRefs = ref([])

// const filters = ref([])
const showOnlyWrongValues = ref(false)
const expandedRows = ref([])

const toggleExpand = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

const plantasStore = usePlantasStore()

// const mainStore = useMainStore()

const analitics = computed(() => plantasStore.getAnaliticas)
const analiticaToUpdate = ref(null)

const isModalDeleteAnaliticsActive = ref(false)
const isModalActive = ref(false)

const perPage = ref(20)

const currentPage = ref(0)

// const itemsPaginated = computed(() =>
//   items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )
// const analiticsPaginated = computed(() =>
//   analitics.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )

// Obtener las zonas del usuario logueado
const userZonas = computed(() => {
  // Si el rol del usuario es admin (antes era 99), no filtramos por zona (puede ver todo)
  if (loginStore.userRole === 'admin' || loginStore.userRole === 99 || loginStore.userRole === '99') {
    return null
  }

  // Buscar el operario correspondiente al usuario logueado
  const operario = plantasStore.getOperarios.find(
    (op) => op.email?.toLowerCase() === loginStore.userEmail?.toLowerCase()
  )
  
  if (!operario) return null

  // Devolver las zonas asignadas al operario
  // console.log(operario.zonas);
  return operario.zonas || []
})

// Función para obtener la zona de una analítica a través del punto de muestreo
const getZonaFromAnalitica = (analitica) => {
  const puntoMuestreo = plantasStore.getPuntosMuestreo.find(
    punto => punto.id === analitica.punto_muestreo_fk
  )
  return puntoMuestreo ? puntoMuestreo.zona_fk : null
}



// const analiticsFiltered = computed(() =>
//   plantaStore.getAnaliticas.filter((analitica) => {
//     const wrongValuesFilter = !showOnlyWrongValues.value || isWrongValues(analitica)
//     return (
//       wrongValuesFilter &&
//       (!filters.fecha_inicio || analitica.fecha >= filters.fecha_inicio) &&
//       (!filters.fecha_final || analitica.fecha <= filters.fecha_final) &&
//       (!filters.punto_muestreo_fk || analitica.punto_muestreo_fk === filters.punto_muestreo_fk) &&
//       (!filters.persona || analitica.personal_fk === filters.persona) &&
//       (!filters.zona || analitica.zona_fk === filters.zona) &&
//       (!filters.operario || analitica.personal_fk === filters.operario) &&
//       (!filters.infraestructura || analitica.infraestructura_id === filters.infraestructura) &&
//       (!filters.type || analitica.type === filters.type)
//     )
//   })
// )

// Modificar el filtrado para incluir restricción por zonas del usuario
const analiticsFiltered = computed(() =>
  plantaStore.getAnaliticas.filter((analitica) => {
    // Restricción por zona según el rol del usuario
    const isAdmin = loginStore.userRole === 'admin' || loginStore.userRole === 99 || loginStore.userRole === '99'
    const zonaFilter = 
      isAdmin || // Administrador ve todo
      (userZonas.value && userZonas.value.some(zona => zona === getZonaFromAnalitica(analitica))) ||
      !userZonas.value // Si no hay restricciones de zona, mostrar todo
    const wrongValuesFilter = !showOnlyWrongValues.value || isWrongValues(analitica)

    
    
    return (
      zonaFilter && // Nueva restricción por zona
      wrongValuesFilter &&
      (!filters.fecha_inicio || analitica.fecha >= filters.fecha_inicio) &&
      (!filters.fecha_final || analitica.fecha <= filters.fecha_final) &&
      (!filters.punto_muestreo_fk || analitica.punto_muestreo_fk === filters.punto_muestreo_fk) &&
      (!filters.persona || analitica.personal_fk === filters.persona) &&
      (!filters.zona || getZonaFromAnalitica(analitica) === filters.zona) &&
      (!filters.operario || analitica.personal_fk === filters.operario) &&
      (!filters.infraestructura || analitica.infraestructura_id === filters.infraestructura) &&
      (!filters.type || analitica.type === filters.type)
    )
  })
)

const sortedAnalitics = computed(() => {
  const analiticsToSort = analiticsFiltered.value

  if (!sortKey.value) return analiticsToSort

  return [...analiticsToSort].sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]
    
    if (sortDir.value === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })
})

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}




const numPages = computed(() => Math.ceil(analitics.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const getNameOperario = (id) => {
  const operario = plantasStore.getOperarios.find((operario) => operario.id === id)
  return operario ? operario.name : 'No asignado'
}

const getPuntoMuestreo = (id) => {
  const puntoMuestreo = plantasStore.getPuntosMuestreo.find(
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
  return (
    analiticsFiltered.value.length > 0 &&
    analiticsFiltered.value.every((analitica) =>
      checkedRows.value.some((row) => row.id === analitica.id)
    )
  )
})

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
  if (
    isCloroWrong(analitica) ||
    isPhWrong(analitica) ||
    isTurbidezWrong(analitica) ||
    isOrganolepticWrong(analitica.olor) ||
    isOrganolepticWrong(analitica.color) ||
    isOrganolepticWrong(analitica.sabor)
  ) {
    {
      return true
    }
  }
}


const toggleAllRows = (isChecked) => {
  if (isChecked) {
    analiticsFiltered.value.forEach((analitica) => {
      if (!checkedRows.value.some((row) => row.id === analitica.id)) {
        checkedRows.value.push(analitica)
      }
    })
  } else {
    checkedRows.value = checkedRows.value.filter(
      (row) => !analiticsFiltered.value.some((analitica) => analitica.id === row.id)
    )
  }
}

const addAnalitica = (analitica, isChecked) => {
  if (isChecked) {
    // Verificar si ya existe antes de añadir
    if (!checkedRows.value.some((row) => row.id === analitica.id)) {
      checkedRows.value.push(analitica)
    }
  } else {
    checkedRows.value = checkedRows.value.filter((item) => item.id !== analitica.id)
  }
}

const handleConfirmDelete = async () => {
  try {
    await deleteAnalitica(analiticaToDelete.value.id)
    await plantasStore.loadAnaliticas()
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

    await plantasStore.loadAnaliticas()
    isModalActive.value = false
    analiticaToEdit.value = null
    analiticaToUpdate.value = null
  } catch (error) {
    console.error('Error al eliminar:', error)
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
  // Crear copia profunda para evitar referencias
  analiticaToEdit.value = JSON.parse(JSON.stringify(analitica))

  

  const today = new Date().toLocaleDateString()
  
  // Crear el nuevo registro de modificación
  const nuevoRegistro = `${today} - Modificado por: ${loginStore.userName}\n${analiticaToEdit.value.observaciones}`
  
  // Añadir el registro nuevo al existente en lugar de reemplazarlo
  if (analiticaToEdit.value.registro) {
    // Añadir el nuevo registro al principio, seguido de un salto de línea
    analiticaToEdit.value.registro = `${nuevoRegistro}\n${analiticaToEdit.value.registro}`
  } else {
    analiticaToEdit.value.registro = nuevoRegistro
  }
  
  await nextTick()
  isModalActive.value = true
}



onMounted(() => {
  console.log('FILTROS: ', filters.value)
  resetForm()
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
    <!-- <BaseButton label="Borrar" color="danger" :icon="mdiTrashCan" /> -->
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
    <!-- <p>This is sample modal</p> -->
  </CardBoxModal>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <FormKit
      v-model="filters.fecha_inicio"
      type="date"
      :options="selectUO"
      placeholder="Fecha Inicio"
      label="Fecha Inicio"
    />
    <FormKit
      v-model="filters.fecha_final"
      type="date"
      :options="selectZona"
      placeholder="Fecha Final"
      label="Fecha Final"
    />
    <FormKit
      v-model="filters.uo"
      type="select"
      :options="selectUO"
      placeholder="Unidad Operativa"
      label="Unidad Operativa"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <FormKit
      v-model="filters.zona"
      type="select"
      :options="selectZona"
      placeholder="Zona de Muestra"
      label="Zona"
    />
    <FormKit
      v-model="filters.infraestructura"
      type="select"
      :options="selectInfraestructura"
      placeholder="Infraestructura"
      label="Infraestructura"
    />
    <FormKit
      v-model="filters.punto_muestreo_fk"
      type="select"
      :options="selectPuntosMuestra"
      placeholder="Punto de muestra"
      label="Punto de Muestra"
    />
    <FormKit
      v-model.number="filters.operario"
      type="select"
      :options="operarioPorZona"
      placeholder="Operario"
      label="Operario"
    />
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" class="text-center">
          <TableCheckboxCell :model-value="allRowsChecked" @update:model-value="toggleAllRows" />
          <!-- <TableCheckboxCell :model-value="checkedRows.value.some(row => row.id === analitica.id)" @update:model-value="(isChecked) => checked(isChecked, analitica)" /> -->
          <!-- <TableCheckboxCell 
          v-if="checkable" 
          @checked="allRowsChecked($event)" 
        /> -->
          <!-- <input type="checkbox" class="rounded"   @change="allRowsChecked($event)" /> -->
        </th>
        <th class="cursor-pointer" @click="handleSort('fecha')" >Fecha <span v-if="sortKey === 'fecha'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span></th>
        <th class="cursor-pointer" @click="handleSort('punto_muestreo_fk')">Punto Muestreo <span v-if="sortKey === 'punto_muestreo_fk'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span></th>
        <th class="cursor-pointer" @click="handleSort('personal_fk')">Operario<span v-if="sortKey === 'personal_fk'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span></th>
        <th class="cursor-pointer" @click="handleSort('type')">Tipo<span v-if="sortKey === 'type'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span></th>
        <th class="text-center">
          <TableCheckboxCell
            :model-value="showOnlyWrongValues"
            label="Solo valores incorrectos"
            @update:model-value="showOnlyWrongValues = $event"
          />
        </th>
        <!-- <th /> -->
      </tr>
    </thead>
    <tbody>
      <template v-for="analitica in sortedAnalitics" :key="analitica.id">
        <tr>
          <TableCheckboxCell
            v-if="checkable"
            :model-value="checkedRows.includes(analitica)"
            @update:model-value="(isChecked) => addAnalitica(analitica, isChecked)"
          />

          <td data-label="Fecha">
            <!-- <td data-label="Fecha" :class="{'bg-red-400': isWrongValues(analitica)}"> -->
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
              @click="toggleExpand(analitica.id)"
            />
          </td>
        </tr>
        <tr v-if="expandedRows.includes(analitica.id)" :key="`expanded-${analitica.id}`">
          <td colspan="5" class="lg:w-1">
            <p><strong>Información adicional:</strong></p>

            <!-- Información adicional aquí -->
            <div class="flex justify-center gap-40">
              <div>
                <li  class="text-gray-600" >
                  <span
                    class="font-semibold text-lg text-gray-700"
                    :class="{ 'text-red-500 underline': isCloroWrong(analitica) }"
                    >Cloro:</span
                  >
                  {{ analitica.cloro?analitica.cloro+' mg/l':'Sin muestra' }}
                </li>
                <li class="text-gray-600">
                  <span
                    class="font-semibold text-lg text-gray-700"
                    :class="{ 'text-red-500 underline': isPhWrong(analitica) }"
                    >pH:</span
                  >
                  {{ analitica.ph?analitica.ph+' ud':'Sin Muestra' }}
                </li>
                <li  class="text-gray-600">
                  <span
                    class="font-semibold text-lg text-gray-700"
                    :class="{ 'text-red-500 underline': isTurbidezWrong(analitica) }"
                    >Turbidez:</span
                  >
                  {{ analitica.turbidez?analitica.turbidez+' UNT':'Sin Muestra' }} 
                </li>
              </div>
              <div v-if="analitica.type === 29">
                <li class="text-gray-600">
                  <span
                    class="font-semibold text-lg text-gray-700"
                    :class="{ 'text-red-500 underline': isOrganolepticWrong(analitica.olor) }"
                    >Olor:</span
                  >
                  {{ analitica.olor ===ORGANOLEPTIC_CORRECT ? 'Correcto' : 'Incorrecto' }}
                </li>
                <li class="text-gray-600">
                  <span
                    class="font-semibold text-lg text-gray-700"
                    :class="{ 'text-red-500 underline': isOrganolepticWrong(analitica.color) }"
                    >Color:</span
                  >
                  {{ analitica.color ===ORGANOLEPTIC_CORRECT ? 'Correcto' : 'Incorrecto' }}
                </li>
                <li class="text-gray-600">
                  <span
                    class="font-semibold text-lg text-gray-700"
                    :class="{ 'text-red-500 underline': isOrganolepticWrong(analitica.sabor) }"
                    >Sabor:</span
                  >
                  {{ analitica.sabor ===ORGANOLEPTIC_CORRECT ? 'Correcto' : 'Incorrecto' }}
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
              <!-- <BaseButtons type="justify-start lg:justify-end" no-wrap> -->
              <BaseButton
                color="info"
                :icon="mdiPencil"
                small
                @click="updateAnaliticaSeleccionada(analitica)"
              />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="deleteAnaliticaSeleccionada(analitica)"
              />
            </BaseButtons>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Total Analíticas {{ analiticsFiltered.length }}</small>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
