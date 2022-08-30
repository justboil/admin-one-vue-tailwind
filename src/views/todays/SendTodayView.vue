<template>
  <LayoutAuthenticated>
    <SectionMain>
        <section class="px-6 sm:px-0 mb-6 grid lg:grid-cols-4 grid-cols-1 gap-5">
        <div class="items-center lg:col-span-3">
          <h1 class="text-2xl">
            ยอดส่งวันนี้
          </h1>
        </div>
        <FormControl
            v-model="searchMember"
            icon="accountSearchOutline"
            class="shadow "
            placeholder="ค้นหาลูกแชร์"
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
                        label="ส่งยอดทั้งหมด"
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
                <tr >
                    <th />
                    <th />
                    <th>ลูกแชร์</th>
                    <th class="text-right">ยอดส่งวันนี้</th>
                    <th class="text-right">จ่ายยอดส่งวันนี้</th>
                    <th class="text-right">ยอดค้างส่ง</th>
                    <th class="text-right">จ่ายยอดค้างส่ง</th>
                    <th class="text-right">ยอดส่งรวม</th>
                    <th class="text-right">ส่งแล้วรวม</th>
                    <th class="text-right">เหลือส่งรวม</th>
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
                <td data-label="ยอดส่งวันนี้" class="text-right">
                    <b ><u>{{ formatCurrency(member.sumSend) }}</u></b>
                </td>
                <td class="border-b-0 lg:w-6 " data-label="จ่ายยอดส่งวันนี้">
                  <FormControl
                    v-model="member.sumSendPaid"
                    type="number"
                    icon="cashMultiple"
                    class="w-40"
                    placeholder="จ่ายยอดส่งวันนี้"
                  />
                </td>
                <td data-label="ยอดค้างส่ง" class="text-right ">
                    <b class="text-orange-500"><u>{{ formatCurrency(member.sumDebt) }}</u></b>
                </td>
                <td class="border-b-0 lg:w-6 " data-label="จ่ายยอดค้างส่ง">
                  <FormControl
                    v-model="member.sumDebtPaid"
                    type="number"
                    icon="cashMultiple"
                    class="w-40"
                    placeholder="จ่ายยอดค้างส่ง"
                  />
                </td>
                <td data-label="ยอดส่งรวม" class="text-right whitespace-nowrap">
                    <b ><u>{{ formatCurrency(member.sumSend + member.sumDebt) }}</u></b>
                </td>
                <td data-label="ส่งแล้วรวม" class="text-right">
                    <b class="text-teal-500 "><u>{{ formatCurrency((member.sumSend - member.sumSendBalance) + (member.sumDebt - member.sumDebtBalance)) }}</u></b>
                </td>
                <td data-label="เหลือส่งรวม" class="text-right">
                    <b class="text-rose-500 " ><u>{{ formatCurrency(member.sumSendBalance + member.sumDebtBalance) }}</u></b>
                </td>
                <td class=" lg:w-1 whitespace-nowrap">
                    <BaseButtons
                    v-if="!member.sumSendPaid && !member.sumDebtPaid "
                    type="justify-end"
                    no-wrap
                    >
                      <BaseButton
                          color="info"
                          icon="accountSearchOutline"
                          label="รายละเอียด"
                          small
                          @click="isModalActive = true"
                      />
                      <!-- <BaseButton
                          color="success"
                          icon="cashCheck"
                          label="ส่งยอด"
                          small
                          @click="confirm('ยืนยันส่งยอดทั้งหมด ใช่หรือไม่ ?',member.memberId,paid)"
                      /> -->
                    </BaseButtons>
                    <BaseButtons
                    v-else
                    type="justify-end"
                    no-wrap
                    >
                      <BaseButton
                          color="danger"
                          icon="close"
                          label="ยกเลิก"
                          small
                      />
                      <BaseButton
                          :disabled="member.sumSendPaid > member.sumSend || member.sumDebtPaid > member.sumDebt"
                          color="success"
                          icon="check"
                          label="บันทีก"
                          small
                          @click="paidPartial(member)"
                      />
                      
                    </BaseButtons>
                </td>
                </tr>
            </tbody>
            <tfoot>
              <tr >
                <td colspan="2">ยอดรวม</td>
                <td colspan="2" class="text-right" data-label="รวมยอดส่งวันนี้">{{ formatCurrency(sum().sumSend) }}</td>
                <td colspan="2" class="text-right" data-label="รวมยอดค้างส่ง"><b class="text-orange-500">{{ formatCurrency(sum().sumDebt) }}</b></td>
                <td colspan="2" class="text-right" data-label="รวมยอดส่ง">{{ formatCurrency(sum().sumSend + sum().sumDebt) }}</td>
                <td class="text-right" data-label="รวมส่งแล้ว"> <b class="text-teal-500">{{formatCurrency(sum().sumPaid)}}</b></td>
                <td class="text-right " data-label="รวมเหลือส่ง"> <b class="text-rose-500">{{formatCurrency(sum().sumBalance )}}</b></td>
              </tr>
            </tfoot>
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
            perPage : 10,
            currentPage : 0,
            checkedRows : [],
            items : [],
            textConfirm : "",
            modalConfirm : false,
            funcConfirm : Function,
            idConfirm : null,
        }
    },
    created() {
      this.getSends()
    },
    methods: {
      async getSends(){
        let loader = this.$loading.show();
        const resp = await DashboardService.getDashboardAmountSend();
        if(resp.data){
          this.items = resp.data.data
          loader.hide()
        }
      },
      async paid(){
        let loader = this.$loading.show();
      },
      paidPartial(member){
        const sendPaid = member.sumSendPaid;
        const debtPaid = member.sumDebtPaid;
        
      },
      countChecked(){
        return (this.checkedRows.length > 0 ? '(เลือก ' + this.checkedRows.length + ' รายการ)':'')
      },
      sum(){
        let sumSend = 0,sumDebt = 0 ,sumBalance = 0,sumPaid = 0;
        this.items.map((row) => {
            sumSend += row.sumSend;
            sumDebt += row.sumDebt;
            sumPaid += (row.sumSend - row.sumSendBalance) + (row.sumDebt - row.sumDebtBalance);
            sumBalance += (row.sumSendBalance + row.sumDebtBalance);
        })
        return {
          sumSend,
          sumDebt,
          sumPaid,
          sumBalance
        }
      },
      checkedSum(){
        let sumSend = 0,sumBalance = 0,sumPaid = 0;
        this.checkedRows.map((row) => {
            sumSend += (row.sumSend+row.sumDebt);
            sumPaid += (row.sumSend - row.sumSendBalance) + (row.sumDebt - row.sumDebtBalance);
            sumBalance += (row.sumSendBalance + row.sumDebtBalance);
        })
        return {
          sumSend,
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
      confirm(text,id,func){
        this.textConfirm = text
        this.funcConfirm = func
        this.idConfirm = id
        this.modalConfirm = true
      },
      formatCurrency(amt){
        return numeral(amt).format(0,0)
      }
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