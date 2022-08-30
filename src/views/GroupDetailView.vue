<template>
  <LayoutAuthenticated>
    
    <SectionMain>
      <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <h1 class="text-2xl">
            รายละเอียดวงแชร์
          </h1>
        </div>
        <BaseButton
          icon="chevronLeft"
          label="ย้อนกลับ"
          color="light"
          small
          @click="$router.push({ path: '/groups', replace: true })"
        />
      </section>
      
        <TableGroupDetail :group="group"/>
        <GroupDetailAmountModal 
          v-model="modalGroupDetailAmount" 
          :groupId="group.id" 
          :groupDetailId="groupDetailId" 
          :groupSubDetailId="groupSubDetailId"
          has-cancel
        />

        <CardBox
            title="อธิบายสัญลักษ์"
            class="shadow-lg"
            has-table
            header-icon=""
        >
          <div class="grid lg:grid-cols-5  xs:grid-cols-2 gap-5 p-3">
            <span><mdicon width="16" height="16" name="checkCircleOutline" class="inline-block text-green-500 mr-1"/>รับหรือส่งยอดทั้งหมดแล้ว</span>
            <span><mdicon width="16" height="16" name="alertCircleOutline" class="inline-block text-blue-500 mr-1"/>ส่งยอดแล้วบางส่วน</span>
            <span><mdicon width="16" height="16" name="alertCircleOutline" class="inline-block text-yellow-500 mr-1"/>มีค่าดูแล</span>
            <span><mdicon width="16" height="16" name="alertCircleOutline" class="inline-block text-purple-500 mr-1"/>มีค่าปรับ</span>
            <span><mdicon width="16" height="16" name="alertCircleOutline" class="inline-block text-red-500 mr-1"/>ยอดรับ (หักค่าอื่นๆแล้ว)</span>
          </div>
        </CardBox>

        <CardBox
            title="สรุปยอดรับ-ส่ง"
            class="shadow-lg mt-3"
            has-table
            header-icon=""
        >
          <div class="overflow-x-auto">
            <table >
              <thead>
                  <tr >
                      <th/>
                      <th>ลูกแชร์ </th>
                      <th class="text-center">จำนวนมือ </th>
                      <th 
                        class="text-center" 
                        v-for="(detail,index) in group.groupDetails" 
                        :key="detail.id">
                          {{ getPeriod(index) }}
                          <br>
                          {{ nextDate(index) }}
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr
                  v-for="groupByMember in listGroupByMember" 
                  :key="groupByMember.name"
                  >
                      <td class="border-b-0 lg:w-6 before:hidden">
                        <UserAvatar
                          :username="groupByMember.id"
                          class="w-12 h-12 mx-auto lg:w-10 lg:h-10"
                          />
                      </td>
                      <td data-label="ลูกแชร์">
                          {{ groupByMember.name }} 
                      </td>
                      <td data-label="จำนวนมือ" class="text-center">
                          {{ groupByMember.hands }} 
                      </td>
                      <td class="text-center" v-show="groupByMember.sends.length > 0" v-for="(send,index) in groupByMember.sends" :key="send.id" :data-label="getPeriod(index)">
                          <span>
                            <mdicon v-if="send.icon" :name="send.icon" width="16" height="16" class="inline-block mr-1" :class="[send.iconColor]"/> 
                            {{ formatCurrency(send.amount) }}
                          </span>
                      </td>
                      
                  </tr>
              </tbody>
            </table>
          </div>  
          <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"/>
        </CardBox>

        <CardBox
            title="รายการยอดรับ-ส่ง"
            class="shadow-lg mt-3"
            has-table
            header-icon=""
        >
          <div class="overflow-x-auto">
            <table class="table-auto">
              <thead>
                  <tr >
                      <th/>
                      <th class="text-center">มือที่</th>
                      <th >ลูกแชร์</th>
                      <th 
                        class="text-center" 
                        v-for="(detail,index) in group.groupDetails" 
                        :key="detail.periodReceive" >
                          {{ getPeriod(index) }}
                          <br>
                          {{ nextDate(index) }}
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr
                  v-for="detail in group.groupDetails" 
                  :key="detail.detailId"
                  >
                      <td class="border-b-0 lg:w-6 before:hidden">
                        <UserAvatar
                          :username="detail.member.id"
                          class="w-12 h-12 mx-auto lg:w-10 lg:h-10"
                          />
                      </td>
                      <td data-label="มือที่" class="text-center">
                          {{ (detail.handNo ? detail.handNo : 'รอบิท') }}
                      </td>
                      <td data-label="ลูกแชร์">
                          {{ detail.member.name }}
                      </td>
                      <td class="text-center" v-for="(subDetail,index) in detail.groupSubDetails" :key="subDetail.id" :data-label="getPeriod(index)">
                          <span>
                            <mdicon 
                              v-for="symbol in getIcon(index,detail,subDetail)" 
                              :key="symbol.code" 
                              :name="symbol.icon" 
                              width="16" 
                              height="16" 
                              class="inline-block mr-1" 
                              :class="[symbol.color]"
                            /> 
                            <u @click="detailGroupAmount(detail.id,subDetail.id)">
                              {{ formatCurrency(calculateAmt(index,detail,subDetail).amt) }}
                            </u>
                          </span>
                      </td>
                      <td  :data-label="'01/'+group.groupDetails.length" :colspan="group.groupDetails.length" v-if="detail.groupSubDetails.length == 0">
                        <i class="uil fs-2 uil-check text-primary"></i> {{ formatCurrency(group.amount) }}
                      </td>
                  </tr>
              </tbody>
            </table>
          </div>  
          <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"/>
        </CardBox>

        <CardBox
            v-if="group.type === '2'"
            title="ประวัติการบิท/เปียร์"
            class="shadow-lg mt-3"
            has-table
            header-icon=""
        >
          <div class="overflow-x-auto">
            <table >
              <thead>
                  <tr >
                      <th>งวดที่</th>
                      <th>วันที่</th>
                      <th>ลูกแชร์</th>
                      <th>ดอกเบี้ย</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="text-center" v-for="detail in hisBitOrderedBitDate" :key="detail.id">
                      <td data-label="งวดที่" v-if="detail.bitAmount > 0"> {{ ("0"+detail.handNo).slice(-2)  + '/' + group.numOfPlayer }}</td>
                      <td data-label="วันที่" v-if="detail.bitAmount > 0"> {{ formatDate(detail.bitDate) }}</td>
                      <td data-label="ลูกแชร์" v-if="detail.bitAmount > 0">{{ detail.member.name }}</td>
                      <td data-label="ดอกเบี้ย" v-if="detail.bitAmount > 0">
                          {{detail.bitAmount}}
                      </td>
                  </tr>
              </tbody>
            </table>
          </div>  
          <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"/>
        </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import TableGroupDetail from '@/components/TableGroupDetail.vue'
import GroupService from '@/services/group'
import GroupDetailAmountModal from '@/components/GroupDetailAmountModal.vue'

import numeral from 'numeral'
import moment from 'moment'
import _ from "lodash"

export default {
    data(){
        return {
            group : { groupDetails : [], groupSubDetails:[] },
            listGroupByMember : [],
            summaries:[],
            modalGroupDetailAmount : false,
            groupDetailId : null,
            groupSubDetailId : null
        }
    },
    created() {
      this.getGroups()
      this.getGroupDetailSummary(this.$route.params.id)
    },
    computed: {
        hisBitOrderedBitDate: function () {
          return _.orderBy(this.group.groupDetails, 'bitDate')
        }
    },
    methods: {
      async getGroups(){
        let loader = this.$loading.show();
        const resp = await GroupService.loadGroup(this.$route.params.id);
        if(resp.data){
          this.group = resp.data.data
          this.group.groupDetails = _.orderBy(this.group.groupDetails,'handNo');
          loader.hide()
        }
      },
      getGroupDetailSummary(groupId){
        let loader = this.$loading.show();
        GroupService.getGroupDetailSummary(groupId)
        .then(
            (response) => {
                this.summaries = response.data.data;
                this.listGroupByMember = this.groupByMember()
                loader.hide() 
            },
            (error) =>{
                console.log(error)
            }
        );
      },
      groupByMember() {
          let listResults = [];
          this.summaries.forEach(function (item) {
              let amountSend = item.sumAmountSend + item.sumCareFee + item.sumFine
              let amountRec = item.amountReceive

              let send = {
                  id : item.id,
                  periodSend : item.periodSend,
                  amount : amountRec > 0 ? amountRec - amountSend : amountSend,
                  icon : amountRec > 0 ? 'alertCircleOutline' : (item.sumCareFee > 0 ? 'alertCircleOutline' : ( item.sumFine > 0 ? 'alertCircleOutline' : '' ) ),
                  iconColor : amountRec > 0 ? 'text-red-500' : (item.sumCareFee > 0 ? 'text-yellow-500' : ( item.sumFine > 0 ? ' text-purple-500' : '' ) ),

                  received :  amountRec > 0 ? 'Y' : 'N',
                  dateSend : item.dateSend,
                  amountSend : item.sumAmountSend,
                  amountReceive : item.amountReceive,
                  careFee : item.sumCareFee,
                  fine : item.sumFine,
                  paid : item.sumPaid
              }

              let findMember = listResults.filter(res => res.name == item.memberName)

              if (findMember.length > 0) {        
                  findMember[0].sends.push(send)
              } else {
                  listResults.push({
                      id : item.memberId,
                      name: item.memberName,
                      hands: item.hands,
                      sends: [send],
                  })
              }
          })

          return listResults;
      },
      calculateAmt(index, detail, subDetail) {
        let amountRec = this.group.amount;
        let careFeeType = this.group.careFeeType
        let careFee = 0;
        if (detail.careFeeFlag == 'Y') {
            if (careFeeType == '1') {
                if (index == 0) {
                    careFee = this.group.careFee;
                }
            } else if (careFeeType == '2') {
                if (detail.periodReceive == subDetail.periodSend) {
                    careFee = this.group.careFee;
                }
            }
        }

        let sum = careFee + Number(subDetail.fine) + Number(subDetail.amountSend);
        let flag = null;

        let result = sum;
        
        // เป็นงวดที่มียอดรับหรือไม่
        if (detail.periodReceive == subDetail.periodSend) {
            if(amountRec > sum){
                result = amountRec - sum;
                flag = "REC"
            }else{
                result = sum - amountRec
                flag = "SEND"
            }
        }

        return {amt : result, flag : flag}
      },
      getIcon(index, detail, subDetail) {
        let result = [];

        let careFeeType = this.group.careFeeType
        let amountRec = this.group.amount
        let careFee = 0;

        if (detail.careFeeFlag == 'Y') {
            if (careFeeType == '1') {
                if (index == 0) {
                    // มีค่าดูแล มือแรก
                    careFee = this.group.careFee
                }
            }

            if (careFeeType == '2') {
                if (amountRec > 0 && detail.periodReceive == subDetail.periodSend) {
                    // มีค่าดูแล มือที่รับ
                    careFee = this.group.careFee
                }
            }
        } 

        if (subDetail.paid == (subDetail.amountSend + subDetail.fine + careFee)) {
            // ส่งยอดแล้ว
            result.push({code:"S",icon:"checkCircleOutline",color:'text-green-500'})
            return result
        } else {

            if (subDetail.fine > 0) {
                // มีค่าปรับ
                result.push({code:"F",icon:"alertCircleOutline",color:'text-purple-500'})
            }

            if (careFee > 0 ) {
                // มีค่าดูแล
                result.push({code:"W",icon:"alertCircleOutline",color:'text-yellow-500'})
            } 
            
            if (subDetail.periodSend == detail.periodReceive){
                if(detail.received == 'Y'){
                    // รับยอดแล้ว
                    result.push({code:"S",icon:"checkCircleOutline",color:'text-green-500'})
                }else{
                    // มียอดรับ แต่ยังไม่ได้รับยอด
                    result.push({code:"R",icon:"alertCircleOutline",color:'text-red-500'})
                }
            }else{
                if(subDetail.paid > 0 && (subDetail.paid < this.calculateAmt(index,detail,subDetail).amt)){
                    // ส่งยอดแล้วแต่ยังไม่ครบ ส่งแค่บางส่วน
                    result.push({code:"P",icon:"alertCircleOutline",color:'text-blue-500'})
                }
            }
          }

        return result;
      },
      detailGroupAmount(detailId,subDetailId){
        this.modalGroupDetailAmount = true
        this.groupDetailId = detailId;
        this.groupSubDetailId = subDetailId;
      },
      getPeriod(index){
          return (("0"+(index + 1)).slice(-2))+'/'+this.group.numOfPlayer
      },
      nextDate(numNext){
          const startDate = new Date(this.group.startDate).getDate()
          return this.formatDate(new Date(this.group.startDate).setDate(startDate + (numNext * parseInt(this.group.payRound))));
      },
      formatCurrency(amt){
        return numeral(amt).format(0,0)
      },
      formatDate(date){
        if(!date){
          return ""
        }
        return moment(new Date(date)).format('DD/MM/YYYY');
      }
    },
    components : {
        LayoutAuthenticated,
        SectionMain,
        BaseButtons,
        BaseButton,
        UserAvatar,
        CardBox,
        TableGroupDetail,
        GroupDetailAmountModal
    }
}
</script>