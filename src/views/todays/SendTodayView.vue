<template>
  <LayoutAuthenticated>
    <SectionMain>
        <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <h1 class="text-2xl">
            ยอดส่งวันนี้
          </h1>
        </div>
        <FormControl
                v-model="searchMember"
                icon="accountSearchOutline"
                class="shadow"
                placeholder="ค้นหาลูกแชร์"
            />
      </section>
        <CardBoxModal
            v-model="isModalActive"
            title="Sample modal"
        >
            <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
            <p>This is sample modal</p>
        </CardBoxModal>

        <CardBox
            header-icon=""
            :title="'รายการยอดส่ง ' + countChecked()"
            v-if="itemsPaginated.length > 0"
            has-table
        >
            <div
            class="p-3 bg-gray-100/50 dark:bg-gray-800"
            v-if="checkedRows.length > 0"
            >
            <span
                v-for="checkedRow in checkedRows"
                :key="checkedRow.memberId"
                class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700 mb-1"
            >
                {{ checkedRow.memberName }}
            </span>
            <table>
                <tbody>
                <tr
                >
                    <td >
                    <span class="justify-start">ยอดส่งรวม : </span>
                    <b class="text-red-500 " ><u>{{ formatCurrency(checkedSum().sumBalance) }}</u></b>
                    </td>
                    <td class="before:hidden lg:w-6 whitespace-nowrap">
                    <BaseButtons
                        type="justify-start lg:justify-end"
                        no-wrap
                    >
                        <BaseButton
                        color="success"
                        label="จ่ายยอดส่งทั้งหมด"
                        icon="cashCheck"
                        small
                        @click="isModalActive = true"
                        />
                    </BaseButtons>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <table>
            <thead>
                <tr>
                    <th />
                    <th />
                    <th>ลูกแชร์</th>
                    <th>ยอดส่ง</th>
                    <th>ส่งแล้ว</th>
                    <th>เหลือส่ง</th>
                    <th>จำนวนวง</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="member in itemsPaginated"
                :key="member.memberId"
                >
                <TableCheckboxCell
                    :isChecked="member.checked"
                    class="text-center border-b-0 lg:w-6 before:hidden"
                    @checked="checked($event, member)"
                />
                <td class="border-b-0 lg:w-6 before:hidden">
                    <UserAvatar
                    :username="member.memberId"
                    class="w-12 h-12 mx-auto lg:w-12 lg:h-12"
                    />
                </td>
                <td data-label="ลูกแชร์">
                    {{ member.memberName }}
                </td>
                <td data-label="ยอดส่ง">
                    <b class="text-blue-500 "><u>{{ formatCurrency(member.sumAmountSend) }}</u></b>
                </td>
                <td data-label="ส่งแล้ว">
                    <b class="text-emerald-500 "><u>{{ formatCurrency(member.sumAmountSend - member.balance) }}</u></b>
                </td>
                <td data-label="เหลือส่ง">
                    <b class="text-red-500 " ><u>{{ formatCurrency(member.balance) }}</u></b>
                </td>
                <td data-label="จำนวนวง">
                    {{ member.numGroup }}
                </td>
                <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons
                    type="justify-start lg:justify-end"
                    no-wrap
                    >
                        <BaseButton
                            color="success"
                            icon="cashCheck"
                            label="ส่งยอด"
                            small
                            @click="isModalActive = true"
                        />
                        <BaseButton
                            color="info"
                            icon="accountSearchOutline"
                            label="รายละเอียด"
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
import UserAvatar from '@/components/UserAvatar.vue'
import FormControl from '@/components/FormControl.vue'
import DashboardService from '@/services/dashboard'
import numeral from 'numeral'


export default {
    data(){
        return {
            titleStack : ['รายการวันนี้','ยอดส่งวันนี้'],
            isModalActive : false,
            isModalDangerActive : false,
            perPage : 10,
            currentPage : 0,
            checkedRows : [],
            items : []
        }
    },
    created() {
      this.getSends()
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
      async getSends(){
        const resp = await DashboardService.getDashboardAmountSend();
        if(resp.data){
          this.items = resp.data.data
        }
      },
      countChecked(){
        return (this.checkedRows.length > 0 ? '(เลือก ' + this.checkedRows.length + ' รายการ)':'')
      },
      checkedSum(){
        let sumAmountSend = 0,sumBalance = 0,sumPaid = 0;
        this.checkedRows.map((row) => {
            sumAmountSend += row.sumAmountSend;
            sumPaid += (row.sumAmountSend-row.balance);
            sumBalance += row.balance;
        })
        return {
          sumAmountSend,
          sumPaid,
          sumBalance
        }
      },
      checked(isChecked, member){
        if (isChecked) {
          member.checked = true
          this.checkedRows.push(member)
        } else {
           member.checked = false
          this.checkedRows = this.remove(this.checkedRows, row => row.memberId === member.memberId)
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
        FormControl
    }
}
</script>