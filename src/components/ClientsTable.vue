<template>
  <modal-box v-model="isModalActive" title="Please confirm action">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <div v-if="checkedRows.length" class="bg-gray-50 p-3">
    <span v-for="checkedRow in checkedRows" :key="checkedRow.id" class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm">{{ checkedRow.name }}</span>
  </div>

  <table>
    <thead>
    <tr>
      <th v-if="checkable"></th>
      <th></th>
      <th>Name</th>
      <th>Company</th>
      <th>City</th>
      <th>Progress</th>
      <th>Created</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in itemsPaginated" :key="client.id">
      <checkbox-cell v-if="checkable" @checked="checked($event, client)"/>
      <td class="image-cell">
        <div class="image">
          <img :src="client.avatar" class="rounded-full">
        </div>
      </td>
      <td data-label="Name">{{ client.name }}</td>
      <td data-label="Company">{{ client.company }}</td>
      <td data-label="City">{{ client.city }}</td>
      <td data-label="Progress" class="progress-cell">
        <progress max="100" :value="client.progress">{{ client.progress }}</progress>
      </td>
      <td data-label="Created">
        <small class="text-gray-500" :title="client.created">{{ client.created }}</small>
      </td>
      <td class="actions-cell">
        <div class="buttons right nowrap">
          <button class="button small green" type="button" @click="isModalActive = true">
            <icon icon="eye" />
          </button>
          <button class="button small red" type="button" @click="isModalActive = true">
            <icon icon="trash-can" />
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="buttons">
            <button v-for="page in pagesList"
                    @click="currentPage = page"
                    type="button" class="button"
                    :class="{'active': page===currentPage}"
                    :key="page">{{ page + 1 }}</button>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import axios from 'axios'
import slice from 'lodash/slice'
import remove from 'lodash/remove'
import ModalBox from '@/components/ModalBox'
import Icon from '@/components/Icon'
import CheckboxCell from '@/components/CheckboxCell'

export default {
  name: 'ClientsTable',
  components: {
    ModalBox,
    Icon,
    CheckboxCell
  },
  props: {
    checkable: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const isModalActive = ref(false)

    const isLoading = ref(false)

    const items = ref([])

    const perPage = ref(10)

    const currentPage = ref(0)

    const checkedRows = ref([])

    const itemsPaginated = computed(
      () => slice(items.value, perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
    )

    const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

    const currentPageHuman = computed(() => currentPage.value + 1)

    const pagesList = computed(() => {
      const pagesList = []

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
      }

      return pagesList
    })

    const checked = (isChecked, client) => {
      if (isChecked) {
        checkedRows.value.push(client)
      } else {
        remove(checkedRows.value, row => row.id === client.id)
      }
    }

    // Fetch sample data

    isLoading.value = true

    axios
      .get('data-sources/clients.json')
      .then((r) => {
        isLoading.value = false
        if (r.data && r.data.data) {
          items.value = r.data.data
        }
      })
      .catch(error => {
        isLoading.value = false
        console.error(error.message)
      })

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      checked
    }
  }
}
</script>
