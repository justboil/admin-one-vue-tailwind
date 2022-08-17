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
            :title="'รายการลูกแชร์ ' + countChecked()"
            class="shadow-lg"
            has-table
        >
            <div
            class="p-3 bg-gray-100/50 dark:bg-gray-800"
            v-if="checkedRows.length > 0"
            >
                <span
                    v-for="checkedRow in checkedRows"
                    :key="checkedRow.id"
                    class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700 mb-1"
                >
                    {{ checkedRow.name }}
                </span>
                
                <BaseButtons
                    type="justify-start lg:justify-end"
                    no-wrap
                >
                    <BaseButton
                    color="danger"
                    label="ลบลูกแชร์ทั้งหมด"
                    icon="close"
                    small
                    @click="isModalActive = true"
                    />
                </BaseButtons>
                    
            </div>

            <table>
            <thead>
                <tr >
                    <th />
                    <th />
                    <th class="text-center" >ชื่อ</th>
                    <th class="text-center">สถานะ </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="member in itemsPaginated"
                :key="member.id"
                >
                <TableCheckboxCell
                    v-if="member.status === 'N'"
                    :isChecked="member.checked"
                    class="text-center border-b-0 lg:w-6 before:hidden"
                    @checked="checked($event, member)"
                />
                <td v-else/>
                <td class="border-b-0 lg:w-6 before:hidden">
                    <UserAvatar
                    :username="member.id"
                    class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
                    />
                </td>
                <td data-label="ลูกแชร์">
                    <span >{{ member.name }}</span>
                </td>
                <td data-label="สถานะ">
                    <span> {{ member.status == "Y" ? "กำลังเล่น " + member.numberOfGroup + " วง" : "ว่าง" }} </span>
                </td>
                <td class="before:hidden lg:w-6 whitespace-nowrap">
                    <BaseButtons
                    type="justify-start lg:justify-end"
                    no-wrap
                    >
                    <BaseButton
                        v-if="member.status === 'N'"
                        color="danger"
                        label="ลบ"
                        icon="close"
                        small
                        @click="confirm(
                            'ยืนยันลบลูกแชร์ '+member.name+' ใช่หรือไม่ ?',
                            member.id,
                            deleteMember
                        )"
                    />
                    <BaseButton
                        color="warning"
                        label="แก้ไข"
                        icon="pencil"
                        small
                        @click="edit(member.id)"
                    />
                    <BaseButton
                        color="info"
                        label="รายละเอียด"
                        icon="magnify"
                        small
                        @click="detail(member.id)"
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

import MemberService from '@/services/member'

export default {
    data(){
        return {
            titleStack : ['ลูกแชร์'],
            textConfirm : "",
            modalConfirm : false,
            funcConfirm : Function,
            idConfirm : null,
            perPage :10,
            currentPage : 0,
            checkedRows : [],
            items : [],
            searchMember : ""
        }
    },
    watch : {
      searchMember (value) {
        this.getMembers(value)
      }
    },
    created() {
      this.getMembers()
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
      async getMembers(searchMember = "",order = "DESC",sort = "sumDebt"){
        const resp = await MemberService.getAll();
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
        BaseIcon
    }
}
</script>