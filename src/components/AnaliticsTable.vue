<script setup>
import { computed, ref } from 'vue'
// import { useMainStore } from '@/stores/main'
import { mdiChevronDown, mdiChevronLeft, mdiEye, mdiTrashCan } from '@mdi/js'
// import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import { usePlantasStore } from '../stores/plantas'
// import { getAnaliticas } from '@/services/analiticas'
import FormField from './FormField.vue'
import FormControl from './FormControl.vue'
import useFormSelectData from '../composables/useFormSelectData'
import { FormKit } from '@formkit/vue'

const {
  form: filters,
  selectZona,
  selectPuntosMuestra,
  selectInfraestructura,
  selectUO,
  operarioPorZona
} = useFormSelectData()

defineProps({
  checkable: Boolean
})

// const selectedAnaliticas = ref([])
// const headerChecked = ref(false)
// const checkboxRefs = ref([])

// const filters = ref([])
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

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(20)

const currentPage = ref(0)

const allChecked = ref(false)

const checkedRows = ref([])

// const itemsPaginated = computed(() =>
//   items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )
// const analiticsPaginated = computed(() =>
//   analitics.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )
const analiticsPaginated = computed(() =>
  analitics.value.filter((analitica) => {
    return (
      (!filters.fecha_inicio || analitica.fecha >= filters.fecha_inicio) &&
      (!filters.fecha_final || analitica.fecha <= filters.fecha_final) &&
      (!filters.punto_muestreo_fk || analitica.punto_muestreo_fk === filters.punto_muestreo_fk) &&
      (!filters.persona || analitica.personal_fk === filters.persona)
    )
  })
)

const numPages = computed(() => Math.ceil(analitics.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

// const checked = (isChecked, analitica) => {
//   if (isChecked) {
//     checkedRows.value.push(analitica)
//   } else {
//     checkedRows.value = remove(checkedRows.value, (row) => row.id === analitica.id)
//   }
// }

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
  return id === 28 ? 'Operacional' : 'Rutina'
}

const allRowsChecked = (isChecked) => {
  if (isChecked) {
    checkedRows.value = [...analiticsPaginated.value]
  } else {
    checkedRows.value = []
  }
  // headerChecked.value = event.target.checked
  // const isChecked = event.target.checked

  // // Update all checkboxes
  // analiticsPaginated.value.forEach((analitica, index) => {
  //   if (checkboxRefs.value[index]) {
  //     checkboxRefs.value[index].checked = isChecked
  //   }
  // })

  // // Update checkedRows
  // if (isChecked) {
  //   checkedRows.value = [...analiticsPaginated.value]
  // } else {
  //   checkedRows.value = []
  // }
  // console.log($event);
}

//     const toggleAll = (event) => {
//   if (event.target.checked) {
//     selectedAnaliticas.value = analiticsPaginated.value.map(analitica => analitica.id)
//   } else {
//     selectedAnaliticas.value = []
//   }
// }

const toggleAll = (isChecked) => {
  if (isChecked) {
    checkedRows.value = [...analiticsPaginated.value.map((analitica) => analitica.id)]
  } else {
    checkedRows.value = []
  }
}

const returnRow = (id) => {
  console.log(id)
  return checkedRows.value.find((row) => row.id === id)
}

const addAnalitica = (analitica, isChecked) => {
  console.log(analitica, isChecked)

  if (isChecked) {
    checkedRows.value.push(analitica)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === analitica.id)
  }
}
</script>

<template>
  <!-- <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal> -->

  <!-- <div class="filters flex space-x-4">
    <FormField class="flex-1" label="Fecha Inicio">
      <FormControl v-model="filters.fecha_inicio" type="date" placeholder="Fecha Inicio" />
    </FormField>
    <FormField class="flex-1" label="Fecha Final">
      <FormControl v-model="filters.fecha_final" type="date" placeholder="Zona de muestra" />
    </FormField>
   
  </div>
  <div class="filters flex space-x-4">
    <FormField class="flex-1">
      <FormControl
        v-model="filters.uo"
        type="select"
        placeholder="Unidad Operativa"
        :options="selectUO"
      />
    </FormField>
    <FormField class="flex-1">
      <FormControl
        v-model="filters.zona"
        type="select"
        placeholder="Zona de muestra"
        :options="selectZona"
      />
    </FormField>
    <FormField class="flex-1">
      <FormControl
        v-model="filters.infraestructura"
        type="select"
        placeholder="Infraestructura"
        :options="selectInfraestructura"
      />
    </FormField>
    <FormField class="flex-1">
      <FormControl v-model="filters.puntoMuestreo" type="select" placeholder="PuntoMuestreo" />
    </FormField>
    <FormField class="flex-1">
      <FormControl v-model="filters.persona" type="select" placeholder="Operario" />
    </FormField>
  </div> -->
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
        <th v-if="checkable">
          <TableCheckboxCell
            v-model="allChecked"
            :model-value="allRowsChecked"
            @checked="toggleAll"
          />
          <!-- <TableCheckboxCell :model-value="checkedRows.value.some(row => row.id === analitica.id)" @update:model-value="(isChecked) => checked(isChecked, analitica)" /> -->
          <!-- <TableCheckboxCell 
          v-if="checkable" 
          @checked="allRowsChecked($event)" 
        /> -->
          <!-- <input type="checkbox" class="rounded"   @change="allRowsChecked($event)" /> -->
        </th>
        <th>Fecha</th>
        <th>Punto Muestreo</th>
        <th>Persona</th>
        <th>Tipo Analitica</th>
        <!-- <th>Cloro</th>
        <th>Olor</th>
        <th>Color</th>
        <th>Sabor</th>
        <th>pH</th>
        <th>Turbidez</th>
        <th>Observaciones</th> -->
        <th />
      </tr>
    </thead>
    <tbody>
      <template v-for="analitica in analiticsPaginated" :key="analitica.id">
        <tr>
          <!-- <TableCheckboxCell
          
          :model-value="returnRow(analitica.id)"
          @checked="(isChecked) => addAnalitica(analitica, isChecked)"
        /> -->
          <!-- <TableCheckboxCell
          :model-value="!!checkedRows.value.find(row => row.id === analitica.id)"
          @update:model-value="(isChecked) => addAnalitica(analitica, isChecked)"
        /> -->
          <TableCheckboxCell v-if="checkable" @checked="checked($event, analitica)" />

          <td data-label="Fecha">
            {{ analitica.fecha }}
          </td>
          <td data-label="Punto de Muestreo">
            {{ getPuntoMuestreo(analitica.punto_muestreo_fk) }}
          </td>
          <td data-label="Persona">
            {{ getNameOperario(analitica.personal_fk) }}
          </td>
          <td data-label="Tipo Analitica" class="lg:w-32">
            {{ getTipoAnalitica(analitica.type) }}
          </td>
          <!-- <td data-label="Cloro" class="lg:w-32">
          {{ analitica.cloro }}
        </td>
        <td data-label="Olor" class="lg:w-32">
          {{ analitica.olor }}
        </td>
        <td data-label="Color" class="lg:w-32">
          {{ analitica.color }}
        </td>
        <td data-label="Sabor" class="lg:w-32">
          {{ analitica.sabor }}
        </td>
        <td data-label="pH" class="lg:w-32">
          {{ analitica.ph }}
        </td>
        <td data-label="Turbidez" class="lg:w-32">
          {{ analitica.turbidez }}
        </td>
        <td data-label="Observaciones" class="lg:w-32">
          {{ analitica.observaciones }}
        </td> -->
          <td>
            <BaseButton
              :icon="expandedRows.includes(analitica.id) ? mdiChevronDown : mdiChevronLeft"
              color="info"
              @click="toggleExpand(analitica.id)"
            />
          </td>
        </tr>
        <tr v-if="expandedRows.includes(analitica.id)" :key="`expanded-${analitica.id}`">
          <td colspan="5">
            <!-- Información adicional aquí -->
            <div>
              <p><strong>Información adicional:</strong></p>
              <p>Cloro: {{ analitica.cloro }}</p>
              <p>Olor: {{ analitica.olor }}</p>
              <p>Color: {{ analitica.color }}</p>
              <p>Sabor: {{ analitica.sabor }}</p>
              <p>pH: {{ analitica.ph }}</p>
              <p>Turbidez: {{ analitica.turbidez }}</p>
              <p>Observaciones: {{ analitica.observaciones }}</p>
            </div>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons>
              <!-- <BaseButtons type="justify-start lg:justify-end" no-wrap> -->
              <!-- <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" /> -->
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="isModalDangerActive = true"
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
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
