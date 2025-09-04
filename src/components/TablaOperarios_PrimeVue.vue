<script setup>
import { computed, ref } from 'vue'
import { usePlantasStore } from '@/stores/plantas'
import {
  mdiAccountHardHat,
  mdiAccountSearch,
  mdiEye,
  mdiPencil,
  mdiShieldAccount,
  mdiTrashCan,
  mdiWrench
} from '@mdi/js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import CardBoxModalOperario from './CardBoxModalOperario.vue'
import CardBoxModal from './CardBoxModal.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import BaseButton from '@/components/BaseButton.vue'
import { deleteOperario } from '@/services/operarios'

const plantaStore = usePlantasStore()
const isModalActive = ref(false)
const selectedClient = ref(null)
const operarioSeleccionado = ref(null)
const isModalDangerActive = ref(false)
const operarios = computed(() => plantaStore.getOperarios)

const muestraTipoOperario = (tipo) => {
  const tipoPersonal = plantaStore.getTipoPersonal.find((type) => type.id === tipo)
  return tipoPersonal?.tipo ?? 'N/A'
}

const deleteOperarioSeleccionado = (operario) => {
  operarioSeleccionado.value = operario
  isModalDangerActive.value = true
}

const handleDeleteOperario = async () => {
  try {
    const id = operarioSeleccionado.value.id
    await deleteOperario(id)
    await plantaStore.loadOperarios()
    isModalDangerActive.value = false
    operarioSeleccionado.value = null
    alert('Operario eliminado correctamente')
  } catch (error) {
    alert('Error al borrar operario')
    console.log('error al borrar operario: ', error)
  }
}

const getTypeIcon = (type) => {
  switch (type) {
    case 4:
      return mdiWrench
    case 1:
      return mdiShieldAccount
    case 2:
      return mdiAccountHardHat
    case 3:
      return mdiAccountSearch
    default:
      return mdiEye
  }
}

const openModal = (client) => {
  selectedClient.value = client
  isModalActive.value = true
}

const nombreUO = (id) =>
  computed(() => {
    const uo = plantaStore.getUnidadesOperativas.find((uo) => uo.id === id)
    return uo?.name ?? 'N/A'
  })

const typeBodyTemplate = (rowData) => ({
  $template: `
    <div class="flex items-center">
      <BaseButton color="info" :icon="getTypeIcon(rowData.type)" small class="mr-2" />
      <span>{{ muestraTipoOperario(rowData.type) }}</span>
    </div>
  `,
  rowData
})

const actionsBodyTemplate = (rowData) => ({
  $template: `
    <div class="flex gap-2">
      <Button icon="pi pi-pencil" rounded outlined severity="info" @click="openModal(rowData)" />
      <Button icon="pi pi-trash" rounded outlined severity="danger" @click="deleteOperarioSeleccionado(rowData)" />
    </div>
  `,
  rowData
})

const avatarBodyTemplate = (rowData) => ({
  $template: `
    <UserAvatar :username="rowData.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
  `,
  rowData
})
</script>

<template>
  <CardBoxModalOperario
    v-if="selectedClient !== null"
    v-model="isModalActive"
    :client="selectedClient"
    :title="`Editar Operario`"
    has-cancel
  />

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Eliminar Operario"
    button="danger"
    has-cancel
    @confirm="handleDeleteOperario"
  >
    <p>
      Esta seguro que desea eliminar el operario <b>{{ operarioSeleccionado?.name }}</b>?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>

  <div class="prime-table-wrapper">
    <DataTable
      v-model:selection="selectedClient"
      :value="operarios"
      paginator
      :rows="10"
      :rows-per-page-options="[5, 10, 20, 50]"
      table-style="min-width: 50rem"
      data-key="id"
      :row-hover="true"
      responsive-layout="scroll"
      striped-rows
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">Operarios</h3>
        </div>
      </template>

      <Column header="Avatar" :body="avatarBodyTemplate" style="width: 5rem" />
      <Column field="name" header="Nombre" sortable />
      <Column header="Tipo" :body="typeBodyTemplate" sortable :sort-field="'type'" />
      <Column field="email" header="e-mail" sortable />
      <Column field="ud_operativa_fk" header="UO" :body="(slotProps) => nombreUO(slotProps.ud_operativa_fk)" sortable />
      <Column header="Acciones" :body="actionsBodyTemplate" style="width: 10rem" />
    </DataTable>
  </div>
</template>

<style>
/* Import PrimeVue styles from local assets */
@import '../assets/primevue/datatable.css';
@import '../assets/primevue/button.css';
@import '../assets/primevue/common.css';
@import '../assets/primevue/paginator.css';

/* Define custom surface colors for PrimeVue */
:root {
  --surface-0: #ffffff;
  --surface-50: #f8f9fa;
  --surface-100: #f1f3f5;
  --surface-200: #e9ecef;
  --surface-300: #dee2e6;
  --surface-400: #ced4da;
  --surface-500: #adb5bd;
  --surface-600: #6c757d;
  --surface-700: #495057;
  --surface-800: #343a40;
  --surface-900: #212529;
}

/* Scope PrimeVue styles to our wrapper to avoid affecting other tables */
.prime-table-wrapper {
  /* Reset any inherited styles that might affect PrimeVue */
  font-size: 14px;
  line-height: 1.5;
  background-color: var(--surface-0);
  color: var(--surface-900);
}

/* Add Tailwind classes for the wrapper */
.prime-table-wrapper :deep(.p-component) {
  @apply font-sans;
}

/* Override specific PrimeVue styles only within our wrapper */
.prime-table-wrapper .p-datatable {
  font-family: inherit;
}

.prime-table-wrapper .p-datatable .p-datatable-thead > tr > th {
  background: var(--surface-100);
  color: var(--surface-900);
  padding: 1rem;
  text-align: left;
  border: 1px solid var(--surface-200);
}

.prime-table-wrapper .p-datatable .p-datatable-tbody > tr > td {
  padding: 1rem;
  border: 1px solid var(--surface-200);
}

/* Ensure PrimeVue button styles don't leak */
.prime-table-wrapper .p-button {
  margin: 0;
  padding: 0.5rem 1rem;
}

/* Dark mode support */
.dark .prime-table-wrapper {
  background-color: var(--surface-800);
  color: var(--surface-50);
.dark .prime-table-wrapper .p-datatable .p-datatable-thead > tr > th {
  background: var(--surface-700);
  color: var(--surface-50);
  border-color: var(--surface-600);
}

.dark .prime-table-wrapper .p-datatable .p-datatable-tbody > tr > td {
  border-color: var(--surface-600);
}
</>
