<script setup>
import { computed, ref } from 'vue'
// import { useMainStore } from '@/stores/main'
import PrimeVue from 'primevue/config'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { usePlantasStore } from '../stores/plantas'
import { getAnaliticas } from '@/services/analiticas'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
// import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
// import '@/css/_checkbox-radio-switch.css'

defineProps({
  checkable: Boolean
})

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
})

const selectedAnaliticas = ref([])
const headerChecked = ref(false)
const checkboxRefs = ref([])

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
const analiticsPaginated = computed(() =>
  analitics.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
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

const checked = (isChecked, analitica) => {
  if (isChecked) {
    checkedRows.value.push(analitica)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === analitica.id)
  }
}

const getNameOperario = (id) => {
  const operario = plantasStore.getOperarios.find((operario) => operario.id === id)
  return operario ? operario.name : 'No asignado'
}

const getPuntoMuestreo = (id) => {
  console.log(id)
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
</script>

<template>
  <div class="prime-wrapper">
    <DataTable
      v-model:filters="filters"
      filter-display="row"
      :value="analitics"
      table-style="min-width:50rem"
      :row-hover="true"
      responsive-layout="scroll"
      striped-rows
      paginator
      :rows="20"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Analíticas</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>

      <Column selection-mode="multiple" header-style="width: 3rem">
        <template #header>
          <TableCheckboxCell v-model="allChecked" @checked="toggleAll" />
        </template>
        <template #body="slotProps">
          <TableCheckboxCell
            :checked="checkedRows.includes(slotProps.data)"
            @checked="checked($event.target.checked, slotProps.data)"
          />
        </template>
      </Column>
      <Column field="id" header="Id"></Column>
      <Column header="Punto de muestreo">
        <template #body="slotProps">
          {{ getPuntoMuestreo(slotProps.data.punto_muestreo_fk) }}
        </template>
      </Column>
      <Column field="getOperario" header="Operario">
        <template #body="slotProps">
          {{ getNameOperario(slotProps.data.personal_fk) }}
        </template>
      </Column>
      <Column field="getTipoAnalitica" header="Tipo de analitica">
        <template #body="slotProps">
          {{ getTipoAnalitica(slotProps.data.tipo_analitica_fk) }}
        </template>
      </Column>
      <Column field="fecha" header="Fecha"></Column>
      <Column field="acciones" header="Acciones"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
  vertical-align: middle;
}

:root {
  --body-bg: var(--p-surface-50);
  --body-text-color: var(--p-surface-900);
  --card-border: 1px solid var(--border-color);
  --card-bg: var(--p-surface-0);
  --border-color: var(--p-surface-200);
  --text-color: var(--p-surface-700);
  --overlay-background: #ffffff;
}

:root[class='p-dark'] {
  --body-bg: var(--p-surface-950);
  --body-text-color: var(--p-surface-50);
  --card-border: 1px solid transparent;
  --card-bg: var(--p-surface-900);
  --border-color: rgba(255, 255, 255, 0.1);
  --text-color: var(--p-surface-0);
  --overlay-background: var(--p-surface-900);
}

html {
  font-size: 14px;
}

body {
  margin: 0px;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--body-bg);
  font-weight: normal;
  color: var(--body-text-color);
  padding: 1rem;
}

.card {
  background: var(--card-bg);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

::v-deep(.p-checkbox-box) {
  border-radius: 0.375rem; /* Tailwind's rounded-md */
}
</style>
