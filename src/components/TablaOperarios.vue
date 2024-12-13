<script setup>
import { computed, ref } from 'vue'
import { usePlantasStore } from '@/stores/plantas'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import CardBoxModalOperario from './CardBoxModalOperario.vue'
import FormOperario from './FormOperario.vue'
import CardBoxModal from './CardBoxModal.vue'

defineProps({
  checkable: Boolean
})

const isModalActive = ref(false)
const selectedClient = ref(null)

const plantaStore = usePlantasStore();

// const mainStore = useMainStore()

const operarios =computed(() => plantaStore.getOperarios)

// const items = computed(() => mainStore.clients)

// const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

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

const openmModal = (client) => {
  selectedClient.value = client;
  isModalActive.value = true;
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

const nombreUO = (id) => computed(() => {
  return plantaStore.getUnidadesOperativas.find((uo) => uo.id === id).name
})


</script>

<template>
  <CardBoxModalOperario v-if="selectedClient !== null" v-model="isModalActive" :client="selectedClient" :title="`Editar Operario`">
    <FormOperario :client="selectedClient" /> 
   
    
  </CardBoxModalOperario>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
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
          {{ client.type }}
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
            <BaseButton color="info" :icon="mdiEye" small @click="openmModal(client)" />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
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
