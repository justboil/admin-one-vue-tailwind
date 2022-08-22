<template>
  <LayoutAuthenticated>
    
    <SectionMain>
      <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <h1 class="text-2xl">
            วงแชร์
          </h1>
        </div>
        <BaseButton
          icon="homePlusOutline"
          label="สร้างวงแชร์"
          color="success"
          small
          @click="modalCreate = true"
        />
      </section>
      
        <CardBoxModal
            v-model="modalConfirm"
            title="ยืนยันอีกครั้ง"
            button-label="ยืนยัน"
            @confirm="funcConfirm"
            has-cancel
            >
            <p>{{ textConfirm }}</p>
        </CardBoxModal>
        <CreateGroupModal
          v-model="modalCreate"
          button-label="ยืนยันสร้างวงแชร์"
          has-cancel
          @confirm="getGroups"
        />
        <CardBox
          title="ค้นหาวงแชร์"
          icon="homeSearchOutline"
          form
          class="mb-3"
          header-icon=""
          @submit.prevent="submit"
        >

          <div class="grid lg:grid-cols-5 gap-5">
            <FormField label="วงแชร์">
              <FormControl
                v-model="search.name"
                icon="home"
                
              />
            </FormField>
            <FormField label="ประเภท">
              <FormControl
                v-model="search.type"
                :options="types"
                icon=""
                
              />
            </FormField>
            <FormField label="เงินต้น">
              <FormControl
                v-model="search.amount"
                icon="cash"
                type="number"
              />
            </FormField>
            <FormField label="จำนวนมือ">
              <FormControl
                v-model="search.numOfPlayer"
                icon="accountMultiple"
                type="number"
              />
            </FormField>
            <FormField label="สถานะ">
              <FormControl
                v-model="search.status"
                :options="status"
              />
            </FormField>
          </div>

        
          <BaseDivider />

          <BaseButtons
            type="justify-center"
            no-wrap
          >
            <BaseButton
              type="submit"
              color="info"
              label="ค้นหา"
              small
              icon="magnify"
            />
            <BaseButton
              type="reset"
              color="danger"
              label="ล้าง"
              small
              icon="refresh"
            />
          </BaseButtons>
        </CardBox>
        
        <CardBox
            v-if="itemsPaginated.length > 0"
            title="รายการวงแชร์"
            class="shadow-lg"
            has-table
            header-icon=""
        >
        <div class="overflow-x-auto">
          <table class="text-sm">
            <thead>
                <tr >
                    <th />
                    <th >วงแชร์</th>
                    <th >ประเภทวง</th>
                    <th >เงินต้น</th>
                    <th >จำนวนมือ</th>
                    <th >วันที่เริ่มวง</th>
                    <th >วันที่จบวง</th>
                    <th >รอบการส่งเงิน</th>
                    <th >งวดปัจจุบัน</th>
                    <th >วันที่ปัจจุบัน/งวดถัดไป</th>
                    <th >สถานะ</th>
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
                        :username="group.id"
                        api="bottts"
                        class="w-24 h-24 mx-auto lg:w-12 lg:h-12"
                        />
                    </td>
                    <td data-label="วงแชร์" >
                        {{ group.name }}
                    </td>
                    <td data-label="ประเภทวง">
                        <span>{{ getType(group.type) }}</span>
                    </td>
                    <td data-label="เงินต้น">
                        <span> {{ formatCurrency(group.amount) }} </span>
                    </td>
                    <td data-label="จำนวนมือ">
                        <span>{{ group.numOfPlayer }}</span>
                    </td>
                    <td data-label="วันที่เริ่มวง">
                        <span>{{ formatDate(group.startDate) }}</span>
                    </td>
                    <td data-label="วันที่จบวง">
                        <span>{{ formatDate(group.endDate) }}</span>
                    </td>
                    <td data-label="รอบการส่งเงิน">
                        <span>{{ group.payRound }}</span>
                    </td>
                    <td data-label="งวดปัจจุบัน">
                        <span>{{ group.period }}</span>
                    </td>
                    <td data-label="วันที่ปัจจุบัน/งวดถัดไป">
                        <span>{{ formatDate(group.actionDate) }}</span>
                    </td>
                    <td data-label="สถานะ">
                        <span>{{ group.status }}</span>
                    </td>
                    <td class="before:hidden lg:w-6 whitespace-nowrap">
                        <BaseButtons
                        type="justify-start lg:justify-end"
                        no-wrap
                        >
                            <BaseButton
                                v-if="group.status == 'N'"
                                color="danger"
                                label="ลบ"
                                icon="trashCanOutline"
                                small
                                @click="confirm(
                                    'ยืนยันลบวงแชร์ '+group.name+' ใช่หรือไม่ ?',
                                    group.id,
                                    deleteGroup
                                )"
                            />
                            <BaseButton
                                v-if="group.status == 'N'"
                                color="success"
                                label="เลือกลูกแชร์"
                                icon="accountMultipleCheck"
                                small
                                @click="manage(group.id)"
                            />
                            <BaseButton
                                v-if="group.status == 'P'"
                                color="warning"
                                label="แก้ไข"
                                icon="pencilOutline"
                                small
                                @click="edit(group.id)"
                            />
                            <BaseButton
                                v-if="group.status == 'P'"
                                color="info"
                                label="รายละเอียด"
                                icon="accountDetailsOutline"
                                small
                                @click="detail(group.id)"
                            />
                        </BaseButtons>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
          
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
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBox from '@/components/CardBox.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import FormControl from '@/components/FormControl.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import FormField from '@/components/FormField.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import CreateGroupModal from '@/components/CreateGroupModal.vue'

import GroupService from '@/services/group'
import {getGroupType} from '@/constants/group'

import numeral from 'numeral'
import moment from 'moment'

export default {
    data(){
        return {
            titleStack : ['วงแชร์'],
            textConfirm : "",
            modalConfirm : false,
            modalCreate : false,
            funcConfirm : Function,
            idConfirm : null,
            perPage :10,
            currentPage : 0,
            checkedRows : [],
            items : [],
            createError : "",
            search : {
              name : ""
            },
            types : [
              { id: null, label: 'ทั้งหมด' },
              { id: 1, label: 'ขั้นบันได' },
              { id: 2, label: 'บิทดอกตาม' },
              { id: 3, label: 'เรทดอกตาม' }
            ],
            status : [
              { id: "", label: 'ทั้งหมด' },
              { id: "P", label: 'วงกำลังเล่น' },
              { id: "N", label: 'วงใหม่' },
              { id: "S", label: 'วงจบแล้ว' }
            ],
        }
    },
    created() {
      this.getGroups()
    },
    computed : {
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
      async getGroups(searchGroup = ""){
        const resp = await GroupService.listGroup();
        if(resp.data){
          this.items = resp.data.data
        }
      },
      async deleteGroup(){
          const resp = await GroupService.deleteGroup(this.idConfirm);
          if(resp.data){
              this.idConfirm = null
              this.getGroups()
          }
      },
      manage(groupId){
        this.$router.push({
                name :"group-manage",
                params: {
                    id: groupId
                }
              })
      },
      detail(groupId){
        this.$router.push({
                name :"group-detail",
                params: {
                    id: groupId
                }
              })
      },
      countChecked(){
        return (this.checkedRows.length > 0 ? '(เลือก ' + this.checkedRows.length + ' รายการ)':'')
      },
      checked(isChecked, member){
        if (isChecked) {
          member.checked = true
          this.checkedRows.push(member)
        } else {
           member.checked = false
          this.checkedRows = this.remove(this.checkedRows, row => row.id === member.id)
        }
      },
      remove(arr,cb){
        const newArr = []
        arr.forEach(item => {
          if (!cb(item)) {
            newArr.push(item)
          }
        })
        return newArr
      },
      confirm(text,memberId,func){
        this.textConfirm = text
        this.funcConfirm = func
        this.idConfirm = memberId
        this.modalConfirm = true
      },
      formatCurrency(amt){
        return numeral(amt).format(0,0)
      },
      formatDate(date){
        if(!date){
          return ""
        }
        return moment(new Date(date)).format('DD/MM/YYYY');
      },
      getType(type){
        return getGroupType(type);
      }
    },
    components : {
        LayoutAuthenticated,
        SectionMain,
        SectionTitleBar,
        CardBoxModal,
        TableCheckboxCell,
        BaseLevel,
        BaseButtons,
        BaseButton,
        UserAvatar,
        CardBox,
        FormControl,
        BaseIcon,
        NotificationBar,
        FormField,
        BaseDivider,
        SectionTitleBarSub,
        CreateGroupModal
    }
}
</script>