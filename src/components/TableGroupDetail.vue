<template>

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
                    <th >วันที่เริ่มวง</th>
                    <th >วันที่จบวง</th>
                    <th >รอบการส่งเงิน</th>
                    <th >ค่าดูแล</th>
                    <th >ค่าปรับส่งช้า/วัน</th>
                    <th >งวดปัจจุบัน</th>
                    <th >สถานะ</th>
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
                    <td data-label="วันที่เริ่มวง">
                        <span>{{ formatDate(group.startDate) }}</span>
                    </td>
                    <td data-label="วันที่จบวง">
                        <span>{{ formatDate(group.endDate) }}</span>
                    </td>
                    <td data-label="รอบการส่งเงิน">
                        <span>{{ group.payRound }} วัน</span>
                    </td>
                    <td data-label="ค่าดูแล">
                        <span>{{ group.careFee }} ชำระเมื่อ {{ group.careFeeType }}</span>
                    </td>
                    <td data-label="ค่าปรับส่งช้า/วัน">
                        <span>{{ group.finePerDay }}</span>
                    </td>
                    <td data-label="งวดปัจจุบัน" class="text-center">
                        <span>{{ !group.period  ? 'เกินวันที่จบวงแล้ว' : group.period }}</span>
                    </td>
                    <td data-label="สถานะ">
                        <span>{{ getStatus(group.status,group.actionDate) }}</span>
                    </td>
                    <td class="before:hidden lg:w-6 whitespace-nowrap">
                        <BaseButtons
                        type="justify-end"
                        no-wrap
                        >
                            <BaseButton
                                v-if="group.status === 'N'"
                                color="danger"
                                label="ลบ"
                                icon="homeRemoveOutline"
                                small
                                @click="confirm(
                                    'ยืนยันลบวงแชร์ '+group.name+' ใช่หรือไม่ ?',
                                    group.id,
                                    deleteGroup
                                )"
                            />
                            <BaseButton
                                v-if="groupIsFinished(group.endDate)"
                                color="danger"
                                label="จบวง"
                                icon="homeMinusOutline"
                                small
                                @click="confirm(
                                    'ยืนยันจบวงแชร์ '+group.name+' ใช่หรือไม่ ?',
                                    group.id,
                                    finishGroup
                                )"
                            />
                            <BaseButton
                                color="warning"
                                label="แก้ไข"
                                icon="homeEditOutline"
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
</template>

<script>
import {getGroupType,getGroupStatus} from '@/constants/group'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

import GroupService from '@/services/group'

import numeral from 'numeral'
import moment from 'moment'

export default {
    data() {
        return {
            textConfirm : "",
            modalConfirm : false,
            funcConfirm : Function,
            idConfirm : null,
        }
    },
    methods : {
        async deleteGroup(){
          const resp = await GroupService.deleteGroup(this.idConfirm);
          if(resp.data){
              this.idConfirm = null
              this.$router.push({ path: '/groups', replace: true })
          }
        },
        confirm(text,id,func){
            this.textConfirm = text
            this.funcConfirm = func
            this.idConfirm = id
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
        },
        getStatus(status,actionDate){
            let today = new Date().setHours(0,0,0,0);
            let actDate = new Date(actionDate).setHours(0,0,0,0);
            if(status === 'P' && (today === actDate)){
                return 'วงวันนี้'
            }
            return getGroupStatus(status);
        },
        groupIsFinished(endDate){
            let today = new Date().setHours(0,0,0,0);
            let end = new Date(endDate).setHours(0,0,0,0);
            if(today >= end){
                return true;
            }
            return false;
        }
    },
    components : {
        CardBox,
        BaseButton,
        BaseButtons,
        UserAvatar,
        CardBoxModal
    },  
    props : {
        group : { type : Object , default : null }
    }
}
</script>