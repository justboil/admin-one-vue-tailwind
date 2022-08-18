<template>
  <LayoutAuthenticated>
    <SectionTitleBar :title-stack="titleStack" />
    <SectionMain>
        <CardBoxModal
            v-model="modalConfirm"
            title="ยืนยันอีกครั้ง"
            button-label="ยืนยัน"
            @confirm="funcConfirm"
            has-cancel
            >
            <p>{{ textConfirm }}</p>
        </CardBoxModal>

        <div class="grid lg:grid-cols-3">
            <FormControl
                v-model="searchMember"
                icon="accountSearchOutline"
                class="mb-3 shadow-lg"
                placeholder="ค้นหาลูกแชร์"
            />
            
        </div>
        
        <CardBox
            v-if="itemsPaginated.length > 0"
            title="รายการวงแชร์"
            class="shadow-lg"
            has-table
        >
        <div class="overflow-x-auto">
          <table>
            <thead>
                <tr >
                    <th />
                    <th />
                    <th class="text-center">วงแชร์</th>
                    <th class="text-center">ประเภทวง</th>
                    <th class="text-center">เงินต้น</th>
                    <th class="text-center">จำนวนมือ</th>
                    <th class="text-center">วันที่เริ่มวง</th>
                    <th class="text-center">วันที่จบวง</th>
                    <th class="text-center">รอบการส่งเงิน</th>
                    <th class="text-center">งวดปัจจุบัน</th>
                    <th class="text-center">วันที่ปัจจุบัน/งวดถัดไป</th>
                    <th class="text-center">สถานะ</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="group in itemsPaginated"
                :key="group.id"
                >
                    <TableCheckboxCell
                        v-if="group.status === 'N'"
                        :isChecked="group.checked"
                        class="text-center border-b-0 lg:w-6 before:hidden"
                        @checked="checked($event, group)"
                    />
                    <td v-else/>
                    <td class="border-b-0 lg:w-6 before:hidden">
                        <UserAvatar
                        :username="group.id"
                        api="bottts"
                        class="w-18 h-18 mx-auto lg:w-12 lg:h-12"
                        />
                    </td>
                    <td data-label="วงแชร์">
                        <span>{{ group.name }}</span>
                    </td>
                    <td data-label="ประเภทวง">
                        <span>{{ group.type }}</span>
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
                        <span>{{ group.actionDate }}</span>
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
                                :disabled="group.status !== 'N'"
                                color="danger"
                                label="ลบ"
                                icon="trashCanOutline"
                                small
                                @click="confirm(
                                    'ยืนยันลบลูกแชร์ '+group.name+' ใช่หรือไม่ ?',
                                    group.id,
                                    deleteMember
                                )"
                            />
                            <BaseButton
                                color="warning"
                                label="แก้ไข"
                                icon="pencilOutline"
                                small
                                @click="edit(group.id)"
                            />
                            <BaseButton
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
            funcConfirm : Function,
            idConfirm : null,
            perPage :10,
            currentPage : 0,
            checkedRows : [],
            items : [],
            searchMember : "",
            createError : ""
        }
    },
    watch : {
      searchMember (value) {
        this.getMembers(value)
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
      async deleteMember(){
          const resp = await MemberService.delete(this.idConfirm);
          if(resp.data){
              this.idConfirm = null
              this.getMembers()
          }
      },
      createMember(){
        this.createError = ""
        this.items.map((item) => {
          if(item.name === this.addMember){
            this.createError = "มีชื่อลูกแชร์นี้อยู่แล้ว กรุณาใช้ชื่ออื่น"
          }
        })
        if(this.createError === ""){
          MemberService.create({name:this.addMember}).then(
            (resp) => {
              if(resp.data){
                this.getMembers()
                this.addMember = ""
                MemberService.all()
              }
            }
          );
        }
      },
      update(member){
        this.createError = ""
        this.items.map((item) => {
          if(item.name === member.nameEdit){
            this.createError = "มีชื่อลูกแชร์นี้อยู่แล้ว กรุณาใช้ชื่ออื่น"
          }
        })
        if(this.createError === ""){
          MemberService.update(member.id,member.nameEdit).then(
            (resp) => {
              if(resp.data){
                this.getMembers()
                member.edit = false
              }
            }
          )
          
        }
      },
      edit(memberId){
        this.items.map((item) => {
            if(item.id === memberId){
                item.edit = true
            }
        })
      },
      cancelEdit(member){
        member.edit = false
      },
      detail(memberId){
        this.$router.push({
                name :"member-detail",
                params: {
                    id: memberId
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
        NotificationBar
    }
}
</script>