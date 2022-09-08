<template>
  <LayoutAuthenticated>
    <SectionMain>

      <section class="px-6 sm:px-0 mb-6 grid lg:grid-cols-4 grid-cols-1 gap-5">
        <div class="items-center lg:col-span-3">
          <h1 class="text-2xl">
            ยอดรับวันนี้
          </h1>
        </div>
        <FormControl v-model="searchMember" icon="accountSearchOutline" class="shadow " placeholder="ค้นหาลูกแชร์" />
      </section>

      <CardBoxModal v-model="modalConfirm" title="ยืนยันอีกครั้ง" button-label="ยืนยัน" @confirm="funcConfirm"
        has-cancel>
        <p>{{ textConfirm }}</p>
      </CardBoxModal>

      <ModalDetailMemberReceives
          v-model="modalDetail"
          button-label="ยืนยัน"
          has-cancel
        />

      <CardBox header-icon="" :title="'รายการยอดรับ ' + countChecked()" v-if="itemsPaginated.length > 0" has-table>
        <div class="p-3 bg-gray-100/50 dark:bg-gray-800" v-if="checkedRows.length > 0">
          <span v-for="checkedRow in checkedRows" :key="checkedRow.memberId"
            class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700 mb-1">
            {{ checkedRow.memberName }}
          </span>
          <table>
            <tbody>
              <tr>
                <td>
                  <span class="justify-start">ยอดส่งรวม : </span>
                  <b class="text-red-500 "><u>{{ formatCurrency(checkedSum().sumAmountReceive) }}</u></b>
                </td>
                <td class="before:hidden lg:w-6 whitespace-nowrap">
                  <BaseButtons type="justify-start lg:justify-end" no-wrap>
                    <BaseButton color="success" label="รับยอดทั้งหมด" icon="cashCheck" small
                      @click="isModalActive = true" />
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
              <th class="text-center">ยอดรับวันนี้</th>
              <th class="text-center"></th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in itemsPaginated" :key="member.memberId">
              <TableCheckboxCell :isChecked="member.checked" class="text-center border-b-0 lg:w-6 before:hidden"
                @checked="checked($event, member)" />
              <td class="border-b-0 lg:w-6 before:hidden">
                <UserAvatar :username="member.memberId" class="w-12 h-12 mx-auto lg:w-12 lg:h-12" />
              </td>
              <td data-label="ลูกแชร์">
                {{ member.memberName }}
              </td>
              <td data-label="ยอดรับวันนี้" class="text-right">
                <b class=""><u>{{ formatCurrency(member.sumAmountReceive) }}</u></b>
              </td>
              <td v-if="member.received == 'N'" data-label="ยังไม่รับยอด" class="text-right">
                <b class="text-rose-500"><u>ยังไม่รับยอด</u></b>
              </td>
              <td v-if="member.received == 'Y'" data-label="ยังไม่รับยอด" class="text-right">
                <b class="text-teal-500"><u>รับยอดแล้ว</u></b>
              </td>
              <td class="before:hidden lg:w-6 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton v-if="member.received == 'N'" color="success" label="รับยอด" icon="check" small @click="confirm(
                      'ยืนยันรับยอดของ '+member.memberName+' ใช่หรือไม่ ?',
                      member.memberId,member.received,
                      complete
                  )" />
                  <BaseButton v-else color="danger" label="ยกเลิก" icon="close" small @click="confirm(
                      'ยืนยันยกเลิกรับยอดของ '+member.memberName+' ใช่หรือไม่ ?',
                      member.memberId,member.received,
                      cancel
                  )" />
                  <BaseButton color="info" label="รายละเอียด" icon="magnify" small @click="getToDayAmountReceiveDetail(member.memberId)" />
                </BaseButtons>

              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">ยอดรวม</td>
              <!-- <td colspan="2" class="text-right" data-label="รวมยอดรับวันนี้">{{ formatCurrency(sum().sumReceive) }}</td> -->
              <td class="text-right" data-label="รวมยอดรับวันนี้"> <b
                  class="">{{formatCurrency(sum().sumAmountReceive)}}</b>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800">
          <BaseLevel>
            <BaseButtons>
              <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1" small
                @click="currentPage = page" />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
          </BaseLevel>
        </div>
      </CardBox>
      <CardBox v-else empty />
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
import ToDaysService from '@/services/todays'
import numeral from 'numeral'
import ModalDetailMemberReceives from '@/components/ModalDetailMemberReceives.vue'


export default {
  data() {
    return {
      perPage: 10,
      currentPage: 0,
      checkedRows: [],
      items: [],
      textConfirm: "",
      modalConfirm: false,
      modalDetail : false,
      funcConfirm: Function,
      idConfirm: null,
      receivedConfirm : null,
    }
  },
  created() {
    this.getToDayAmountReceives()
  },
  methods: {
    async getToDayAmountReceives() {
      let loader = this.$loading.show();
      const resp = await ToDaysService.getToDayAmountReceive();
      if (resp.data) {
        // this.items = resp.data.data
        this.items = [
          {
            "memberId": 2,
            "memberName": "พูล",
            "received": "N",
            "sumAmountReceive": 8000,
            "amountReceive": 10000,
            "amountSend": 2000
          },
          {
            "memberId": 3,    
            "memberName": "กอต",
            "received": "N",
            "sumAmountReceive": 19000,
            "amountReceive": 20000,
            "amountSend": 1000
          }
        ];
        console.log("getToDayAmountReceives : ", resp.data.data);
        loader.hide()
      }
    },
    async getToDayAmountReceiveDetail() {
      let loader = this.$loading.show();
      // const resp = await ToDaysService.getToDayAmountReceiveDetail();
      // if (resp.data) {
        // this.items = resp.data.data
        // console.log("getToDayAmountReceiveDetail : ", resp.data.data);
        loader.hide()
      // }
      this.modalDetail = true;
    },  
    async complete() {
      // const resp = await DebtService.complete(this.idConfirm);
      // if(resp.data){
      this.items.forEach(item => {
          if (item.memberId == this.idConfirm) {
            console.log(item)
            item.received = 'Y';
          }
        });
      // }
    },
    async cancel() {
      // const resp = await DebtService.complete(this.idConfirm);
      // if(resp.data){
      this.items.forEach(item => {
          if (item.memberId == this.idConfirm) {
            console.log(item)
            item.received = 'N';
          }
        });
      // }
    },
    countChecked() {
      return (this.checkedRows.length > 0 ? '(เลือก ' + this.checkedRows.length + ' รายการ)' : '')
    },
    sum() {
      let sumAmountReceive = 0;
      this.items.map((row) => {
        sumAmountReceive += row.sumAmountReceive;
      })
      return {
        sumAmountReceive
      }
    },
    checkedSum() {
      let sumAmountReceive = 0;
      this.checkedRows.map((row) => {
        sumAmountReceive += row.sumAmountReceive;
      })
      return {
        sumAmountReceive
      }
    },
    checked(isChecked, member) {
      if (isChecked) {
        member.checked = true
        this.checkedRows.push(member)
      } else {
        member.checked = false
        this.checkedRows = this.remove(this.checkedRows, row => row.memberId === member.memberId)
      }
    },
    remove(arr, cb) {
      const newArr = []
      arr.forEach(item => {
        if (!cb(item)) {
          newArr.push(item)
        }
      })
      return newArr
    },
    confirm(text, id, received, func) {
      this.textConfirm = text
      this.funcConfirm = func
      this.idConfirm = id
      this.receivedConfirm = received
      this.modalConfirm = true
    },
    formatCurrency(amt) {
      return numeral(amt).format(0, 0)
    }
  },
  computed: {
    itemsPaginated() {
      return this.items ? this.items.slice(this.perPage * this.currentPage, this.perPage * (this.currentPage + 1)) : []
    },
    numPages() {
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
  components: {
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
    ModalDetailMemberReceives,
  }
}
</script>