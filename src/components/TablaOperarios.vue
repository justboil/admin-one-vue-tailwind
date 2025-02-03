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
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import CardBoxModalOperario from './CardBoxModalOperario.vue'
import CardBoxModal from './CardBoxModal.vue'
import { deleteOperario } from '@/services/operarios'

defineProps({
  checkable: Boolean
})

const plantaStore = usePlantasStore()

const isModalActive = ref(false)
const selectedClient = ref(null)

const operarioSeleccionado = ref(null)

// const mainStore = useMainStore()

const operarios = computed(() => plantaStore.getOperarios)

// const items = computed(() => mainStore.clients)

// const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

// onMounted(() => {
//   const operarios = searchOperarios();
// })

const operariosPaginated = computed(() =>
  operarios.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(operarios.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

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

// const getTipoPersonal = (id) =>
//   computed(() => {
//     const tipo = plantaStore.getTipoPersonal.find((tipo) => tipo.id === id)
//     return tipo.tipo
//   })

// console.log(getTipoPersonal(1));

const getTypeIcon = (type) => {
  // console.log(type)
  switch (type) {
    case 4:
      return mdiWrench // Replace with the appropriate icon for 'admin'
    case 1:
      return mdiShieldAccount // Replace with the appropriate icon for 'user'
    case 2:
      return mdiAccountHardHat // Replace with the appropriate icon for 'user'
    case 3:
      return mdiAccountSearch // Replace with the appropriate icon for 'user'
    default:
      return mdiEye // Default icon
  }
}
const openModal = (client) => {
  selectedClient.value = client
  isModalActive.value = true
}

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}

const nombreUO = (id) =>
  computed(() => {
    const uo = plantaStore.getUnidadesOperativas.find((uo) => uo.id === id)
    return uo?.name ?? 'N/A'
  })
</script>

<template>
  <CardBoxModalOperario
    v-if="selectedClient !== null"
    v-model="isModalActive"
    :client="selectedClient"
    :title="`Editar Operario`"
    has-cancel
  >
    <!-- <FormOperario :client="selectedClient" /> -->
  </CardBoxModalOperario>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Eliminar Operario"
    button="danger"
    has-cancel
    @confirm="handleDeleteOperario"
  >
    <p>
      Esta seguro que desea eliminar el operario <b>{{ operarioSeleccionado?.name }}</b
      >?
    </p>
    <p>Esta operación no se puede deshacer.</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Nombre</th>
        <th>Tipo</th>
        <th>e-mail</th>
        <th>UO</th>
        <!-- <th>Progress</th> -->

        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in operariosPaginated" :key="client.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="client.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td>
        <td data-label="Name">
          {{ client.name }}
        </td>
        <td data-label="Tipo">
          <BaseButton color="info" :icon="getTypeIcon(client.type)" small class="mr-2" />

          <!-- {{ client.type_bak }} -->
          {{ muestraTipoOperario(client.type) }}
        </td>
        <td data-label="email">
          {{ client.email }}
        </td>
        <td data-label="Unidad Operativa">
          {{ nombreUO(client.ud_operativa_fk) }}
        </td>
        <!-- <td data-label="Progress" class="lg:w-32">
          <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="client.progress">
            {{ client.progress }}
          </progress>
        </td> -->
        <!-- <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="client.created_at">{{
            client.created_at
          }}</small>
        </td> -->
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiPencil" small @click="openModal(client)" />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="deleteOperarioSeleccionado(client)"
            />
            <BaseButton />
          </BaseButtons>
        </td>
      </tr>
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
