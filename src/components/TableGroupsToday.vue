<template>

  <CardBox
    v-if="itemsPaginated.length > 0"
    has-table
  >
    <table>
      <thead>
        <tr>
          <th />
          <th>วงแชร์</th>
          <th>ประเภท</th>
          <th>เงินต้น</th>
          <th>งวดปัจจุบัน</th>
          <th>รายกี่วัน</th>
          <th>จำนวนมือ</th>
          <th>วันที่เริ่มวง</th>
          <th>วันที่จบวง</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="group in itemsPaginated"
          :key="group.id"
        >
          <td class="border-b-0 lg:w-6 before:hidden">
            <UserAvatar
              api="bottts"
              :username="group.id"
              class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
            />
          </td>
          <td data-label="วงแชร์">
            {{ group.name }}
          </td>
          <td data-label="ประเภท">
            {{ group.type }}
          </td>
          <td data-label="เงินต้น">
            {{ group.amount }}
          </td>
          <td data-label="งวดปัจจุบัน">
            {{ group.period }}
          </td>
          <td data-label="รายกี่วัน">
            {{ group.payRound }}
          </td>
          <td data-label="จำนวนมือ">
            {{ group.numOfPlayer }}
          </td>
          <td 
            data-label="วันที่เริ่มวง"
            class="lg:w-1 whitespace-nowrap"
          >
            <small
              class="text-gray-500 dark:text-gray-400"
              :title="new Date(group.startDate)"
            >{{ formatDate(group.startDate) }}</small>
          </td>
          <td 
            data-label="วันที่จบวง"
            class="lg:w-1 whitespace-nowrap"
          >
            <small
              class="text-gray-500 dark:text-gray-400"
              :title="new Date(group.endDate)"
            >{{ formatDate(group.endDate) }}</small>
          </td>
        
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons
              type="justify-start lg:justify-end"
              no-wrap
            >
              <BaseButton
                color="info"
                icon="eye"
                small
                @click="isModalActive = true"
              />

            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
    >
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </CardBox>
  <CardBox v-else empty/>
</template>

<script>
import { useDashboardStore } from '@/stores/dashboard'
import { mdiEye } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import moment from 'moment'
import CardBox from './CardBox.vue'

export default {
    data() {
        return {
          isModalActive : false,
          isModalDangerActive : false,
          perPage : 10,
          currentPage : 0,
          checkedRows : []
        }
    },
    computed : {
      items() {
        return useDashboardStore().dashboard.groupsToday;
      },
      itemsPaginated() {
        return this.items ? this.items.slice(this.perPage * this.currentPage, this.perPage * (this.currentPage + 1)) : []
      },
      numPages(){
        return Math.ceil((this.items ? this.items.length : 0) / this.perPage);
      },
      currentPageHuman() {
        return this.currentPage + 1
      },
      pagesList() {
        const pagesList = []

        for (let i = 0; i < this.numPages; i++) {
          pagesList.push(i)
        }

        return pagesList
      }
    },
    methods: {
      formatDate(date){
        return moment(new Date(date)).format('DD/MM/YYYY');
      }
    },
    components : {
    mdiEye,
    CardBoxModal,
    TableCheckboxCell,
    BaseLevel,
    BaseButtons,
    BaseButton,
    UserAvatar,
    CardBox
}
}
</script>
