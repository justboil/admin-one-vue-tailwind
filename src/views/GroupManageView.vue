<template>
  <LayoutAuthenticated>
    
    <SectionMain>
      <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <h1 class="text-2xl">
            จัดการวงแชร์
          </h1>
        </div>
        <BaseButton
          icon="chevronLeft"
          label="ย้อนกลับ"
          color="info"
          small
          @click="$router.push({ path: '/groups', replace: true })"
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
            v-if="group != null"
            title="รายละเอียดวงแชร์"
            class="shadow-lg mb-3"
            has-table
            headerIcon=""
        >
          <div class="overflow-x-auto">
            <table >
              <thead>
                  <tr >
                      <th />
                      <th >วงแชร์</th>
                      <th >ประเภทวง</th>
                      <th >เงินต้น</th>
                      <th >จำนวนมือ</th>
                      <th >รอบการส่งเงิน</th>
                      <th >ค่าดูแล</th>
                      <th >ค่าปรับส่งช้า/วัน</th>
                      <th />
                  </tr>
              </thead>
              <tbody>
                  <tr>
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
                      <td data-label="รอบการส่งเงิน">
                          <span>{{ group.payRound }}</span>
                      </td>
                      <td data-label="ค่าดูแล">
                          <span>{{ group.careFee }} ชำระเมื่อ {{ group.careFeeType }}</span>
                      </td>
                      <td data-label="ค่าปรับส่งช้า/วัน">
                          <span>{{ group.finePerDay }}</span>
                      </td>
                      <td class="before:hidden lg:w-6 whitespace-nowrap">
                          <BaseButtons
                          type="justify-end"
                          no-wrap
                          >
                              <BaseButton
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
                                  color="warning"
                                  label="แก้ไข"
                                  icon="pencilOutline"
                                  small
                                  @click="edit(group.id)"
                              />
                          </BaseButtons>
                      </td>
                  </tr>
              </tbody>
              </table>
          </div>
          <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800" />
        </CardBox>

        <CardBox
            :title="'รายการลูกแชร์ '+(checkedRows.length > 0 ? countChecked() : getFreeHand())"
            class="shadow-lg"
            has-table
            headerIcon=""
        >
          <div
            class="p-3 bg-gray-100/50 dark:bg-gray-800"
            v-if="checkedRows.length > 0"
            >
            <table>
              <tbody>
                  <tr>
                    <td data-label="มือที่เลือก" class="lg:w-96">
                      <span
                        v-for="checkedRow in checkedRows"
                        :key="checkedRow.handNo"
                        class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700 mb-1 text-right"
                      >
                          มือที่ {{ checkedRow.handNo }}
                      </span>
                    </td>
                    <td  >
                        <div class="flex">
                          <v-select
                            class="text-gray-900 dark:bg-gray-900 rounded text-md shadow border-gray-900 w-48 lg:w-64"
                            :options="memberList" 
                            label="name"
                            v-model="memberSelected"
                            placeholder="เลือกลูกแชร์"
                          />
                          <BaseButton
                            :disabled="memberSelected === ''"
                            color="success"
                            icon="accountCheck"
                            label="เลือก"
                            small
                            class="ml-2"
                            @click="addMember()"
                          />
                          <BaseButton
                            color="danger"
                            icon="close"
                            label="ยกเลิก"
                            small
                            class="ml-2"
                            @click="cancelAdd()"
                          />
                        </div>

                    </td>
                  </tr>
              </tbody>
            </table>         
          </div>
          <div class="p-3 bg-gray-100/50 dark:bg-gray-800" v-else>
            <BaseLevel
                type="justify-start"
            >
                <Datepicker v-model="startDate" format="dd/MM/yyyy" dark class="shadow rounded dark:bg-gray-900"></Datepicker>
                <BaseButton
                  :disabled="!startDate"
                  color="success"
                  icon="calendarCheckOutline"
                  label="เริ่มวง"
                  small
                  class="ml-2"
                  @click="start()"
                />
                <BaseButton
                  color="info"
                  icon="contentSave"
                  label="บันทึก"
                  small
                  class="ml-2"
                  @click="save()"
                />
            </BaseLevel>
            
          </div>
          
          <div class="overflow-x-auto">
            <table >
              <thead>
                  <tr >                      
                      <th >มือที่</th>
                      <th >ยอดส่ง</th>
                      <th class="text-center">ชื่อลูกแชร์</th>
                      <th class="text-center">ค่าดูแล</th>
                      <th >เลือก</th>
                  </tr>
              </thead>
              <tbody>
                  <tr
                    v-for="member in members"
                    :key="member.id"
                  >
                      <td data-label="มือที่" >
                          {{ member.handNo }}
                      </td>
                      <td data-label="ยอดส่ง" class="lg:w-40 text-right">
                          <FormControl
                            v-if="group.type == 1 && (member.handNo > 1 || member.handNo == null)"
                            v-model="member.amount"
                            icon="cash"
                            type="number"
                            class="w-64"
                          />
                          <span
                            v-if="group.type != 1 && (member.handNo > 1 || member.handNo == null)"
                          >{{ (group.type == 2 ? formatCurrency(group.baseAmountSend) : group.interest ) }}</span>
                      </td>
                      <td class="text-center" data-label="ชื่อลูกแชร์">
                          <span> {{ member.name ? member.name : '-' }} </span>
                      </td>
                      <TableCheckboxCell
                          v-if="(member.handNo > 1 || member.handNo == null)"
                          :isChecked="member.careFeeFlag"
                          class="text-center border-b-0 "
                          @checked="careFeeChecked($event, member)"
                          data-label="ค่าดูแล"
                      />
                      <td v-else data-label="ค่าดูแล"/>
                      <TableCheckboxCell
                          v-if="!member.name && (member.handNo > 1 || member.handNo == null)"
                          :isChecked="member.checked"
                          class="text-center border-b-0 lg:w-6"
                          @checked="checked($event, member)"
                          data-label="เลือก"
                      />
                      <td data-label="เลือก" v-else >
                        <BaseButton
                            v-if="(member.name != undefined && member.name != '') && (member.handNo > 1 || member.handNo == null)"
                            color="danger"
                            icon="close"
                            small
                            @click="confirm(
                                    'ยืนยันลบลูกแชร์ '+member.name+' มือที่ '+member.handNo+' ใช่หรือไม่ ?',
                                    member.id,
                                    removeMember
                                )"
                        />
                      </td>
                  </tr>
              </tbody>
              </table>
          </div>
          <div class="p-3 lg:px-6  border-t border-gray-100 dark:border-gray-800 ">
            <BaseLevel>
                รวมยอดส่ง
                <b class="text-green-500 text-xl">{{ formatCurrency(totalAmount) }}</b>
            </BaseLevel>
          </div>
        </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBox from '@/components/CardBox.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import FormControl from '@/components/FormControl.vue'
import FormField from '@/components/FormField.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import NotificationBar from '@/components/NotificationBar.vue'

import GroupService from '@/services/group'
import MemberService from '@/services/member'

import {getGroupType} from '@/constants/group'

import numeral from 'numeral'
import moment from 'moment'

export default {
    data(){
        return {
            textConfirm : "",
            modalConfirm : false,
            funcConfirm : Function,
            idConfirm : null,
            checkedRows : [],
            items : [],
            group : null,
            members : [],
            memberSelected : "",
            memberList : [],
            startDate : new Date()
        }
    },
    created() {
      this.getGroup();
      this.getMemberList();

    },
    computed : {
      totalAmount() {
        return this.members.reduce(function(a, c) {
          return a + Number(c.amount || 0);
        }, 0);
      }
    },
    methods: {
      async getGroup(){
        const resp = await GroupService.loadGroup(this.$route.params.id);
        if(resp.data){
          this.group = resp.data.data
          let whenHandNoNull = 1;
          for (var i = 0; i < this.group.groupDetails.length ; i++) {

            let member = this.group.groupDetails[i].member;
            
            const memberObj = {
              id : this.group.groupDetails[i].id ,
              handNo: !this.group.groupDetails[i].handNo ? whenHandNoNull :this.group.groupDetails[i].handNo,
              member : member,
              name : (member != null ? member.name : null)
            };

            if(i > 0){
              switch(this.group.type){
                //วงขั้นบันได (1)
                case "1" :  memberObj["amount"] = Math.round(this.group.groupDetails[i].groupSubDetails[0].amountSend) ;break;
                //วงบิทดอกตาม (2)
                case "2" : memberObj["amount"] = this.group.baseAmountSend ;break;
                //วงเรทดอกตาม (3)
                case "3" : memberObj["amount"] = this.group.interest ;break;
              }
            }
            
        
            memberObj['careFeeFlag'] = true;
        
            this.members.push(memberObj);
            whenHandNoNull++;
          }
        }
      },
      async getMemberList() {
        await MemberService.getAll().then(
            (response) => {
                const data = response.data.data;
                this.memberList = data;
            },
            (error) => {
                console.log(error);
            }
        );
      },
      async save() {
        const payload = {
          id : this.group.id,
          details : this.members
        }
        await GroupService.updateDetails(payload);
      },
      addMember(){
        for(let checked of this.checkedRows){
          let index = this.members.findIndex(e => e.handNo === checked.handNo);
          if(index != -1){
            this.members[index].member = this.memberSelected
            this.members[index].name = this.memberSelected.name
            this.members[index].checked = false
          }
        }
        this.memberSelected = null
        this.checkedRows = []
      },
      removeMember() {
        const index = this.members.findIndex((item) => item.id === this.idConfirm);
        this.members[index].name = ""
        this.members[index].member = null
      },
      cancelAdd(){
        this.checkedRows.map((row) => {
          const index = this.members.findIndex((item) => item.id === row.id);
          this.members[index].checked = false
        })
        this.checkedRows = []
      },
      start() {
        const payload = {
          id : this.group.id,
          details : this.members
        }
        GroupService.updateDetails(payload).then(
          () => {
            GroupService.startGroup({ id : this.group.id, startDate : this.startDate});
            // this.$router.push({ path: `/groups/detail/${this.groupId}` });
          }
        )
      },
      getFreeHand(){
        const freeHand = this.members.filter(
          (member) => !member.name || member.name === ''
        ).length;
        return freeHand > 0 ? '(ว่าง '+freeHand+ ' มือ)' : '';
      },
      async deleteGroup(){
          const resp = await GroupService.deleteGroup(this.idConfirm);
          if(resp.data){
              this.idConfirm = null
              this.$router.push("/groups")
          }
      },
      countChecked(){
        return (this.checkedRows.length > 0 ? '(เลือก ' + this.checkedRows.length + ' รายการ)':'')
      },
      careFeeChecked(isChecked, member){
        if (isChecked) {
          member.careFeeFlag = true
        } else {
          member.careFeeFlag = false
        }
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
    BaseDivider
}
}
</script>