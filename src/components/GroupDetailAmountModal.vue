<template>
  <OverlayLayer
    v-show="value"
  >
    <CardBox
      v-show="value"
      title="รายละเอียดยอด"
      class="shadow-lg w-full  overflow-y-auto md:w-3/5 lg:w-1/1 z-50"
      header-icon="close"
      modal
      @header-icon-click="cancel"
    >
      
      <div class="overflow-x-auto">
        <table >
          <thead>
              <tr >
                  <th>รายการ </th>
                  <th class="text-center">จำนวนเงิน </th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td data-label="รายการ">
                      <span class="ms-2">ยอดส่ง งวดที่ {{ periodSend }} มือที่ {{ handNo }}</span>
                  </td>
                  <td data-label="จำนวนเงิน" >
                    <b><u>{{ formatCurrency(amountSend) }}</u></b>                  
                  </td>
              </tr>
              <tr v-if="hasCareFee">
                  <td >
                      <label class="checkbox">
                        <input
                          v-if="!completed"
                          v-model="careFeeChecked"
                          :checked="careFeeChecked"
                          type="checkbox"
                        >
                        <span class="check">ค่าดูแล</span>
                      </label>
                  </td>
                  <td>
                    <span class="me-2"><b><u>{{ getCareFee(group) }}</u></b></span>
                  </td>
              </tr>
              <tr v-if="fine > 0 ">
                  <td>
                      ค่าปรับ
                  </td>
                  <td v-if="completed">
                      <b><u>{{ $options.filters.currency(fine) }}</u></b>
                  </td>
                  <td v-else>
                      <FormControl
                        class="w-32"
                        v-model="fine"
                        icon="cashMultiple"
                      />
                  </td>
              </tr>
          </tbody>
        </table>
      </div>  
      <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800">
        <BaseLevel>
          ยอดส่งรวม
          <b><u>{{ formatCurrency(amountSend + getCareFee(group) + fine) }} </u></b>
        </BaseLevel>
        <BaseDivider />
        <BaseLevel>
          ส่งแล้ว
          <FormControl
            type="number"
            class="w-32"
            v-model="paid"
            icon="cashMultiple"
          />        
          </BaseLevel>
        <BaseDivider />
        <BaseLevel>
          เหลือส่ง
          <b><u>{{ formatCurrency(getBalance(group)) }} </u></b>
        </BaseLevel>
      </div>

      <BaseDivider />

      <BaseButtons
        type="justify-center"
      >
        <BaseButton
          label="บันทึก"
          color="success"
          icon="checkCircleOutline"
          @click="save"
        />
        <BaseButton
          v-if="hasCancel"
          label="ยกเลิก"
          color="danger"
          icon="close"
          @click="cancel"
        />
      </BaseButtons>
    </CardBox>
  </OverlayLayer>
</template>

<script >
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

import GroupService from '@/services/group'
import BaseLevel from './BaseLevel.vue'

import numeral from 'numeral'

export default {
  data () {
    return {
      group : null,
      careFeeChecked : null,
      hasCareFee : false,
      isReceive : false,
      completed : false,
      periodSend : "",
      handNo : "",
      amountSend : 0,
      fine : 0,
      paid : 0
    }
  },
  emits:['update:modelValue', 'cancel', 'confirm'],
  watch : {
    groupDetailId : function(n,o){
      if(n){
        this.getGroupDetailAmount()
      }
    }
  },
  computed:{
    value:{
      get(){
        return this.modelValue
      },
      set(newValue){
        this.$emit('update:modelValue', newValue)
      }
    }
  },
  methods: {
    confirmCancel(mode){
      this.value = false
      this.$emit(mode)
    },
    confirm(){
      this.confirmCancel('confirm')
    },
    cancel(){
      this.confirmCancel('cancel')
    },
    async getGroupDetailAmount(){
        const response = await GroupService.getGroupDetailAmount(
          this.groupId,
          this.groupDetailId,
          this.groupSubDetailId
        )
        if(response.data){
            this.group = response.data.data
            this.careFeeChecked = this.group.groupDetails[0].careFeeFlag == 'Y'
            this.completed = this.group.groupDetails[0].groupSubDetails[0].completed == 'Y'
            this.isReceive = this.group.groupDetails[0].periodReceive == this.group.groupDetails[0].groupSubDetails[0].periodSend
            this.memberName = this.group.groupDetails[0].member.name
            this.periodSend = this.group.groupDetails[0].groupSubDetails[0].periodSend
            this.handNo = this.group.groupDetails[0].handNo
            this.amountSend = this.group.groupDetails[0].groupSubDetails[0].amountSend
            this.fine = this.group.groupDetails[0].groupSubDetails[0].fine 
            this.paid = this.group.groupDetails[0].groupSubDetails[0].paid 
        }
    },
    getBalance(group){
      if(group){
        let amountSend = group.groupDetails[0].groupSubDetails[0].amountSend;
        let paid = group.groupDetails[0].groupSubDetails[0].paid;
        let fine = group.groupDetails[0].groupSubDetails[0].fine;
        let careFee = this.getCareFee(group);
        return (amountSend + fine + careFee) - paid
      }
      return 0;
    },
    getCareFee(group){

        if(group){
          let careFee = group.careFee
          let careFeeType = group.careFeeType
          let careFeeFlag = group.groupDetails[0].careFeeFlag;
          let period = group.groupDetails[0].groupSubDetails[0].periodSend.split("/")[0];
          

          if(careFeeFlag == 'Y' && this.careFeeChecked){ // คิดค่าดูแล
              if(careFeeType == '1'){ // คิดค่าดูแล มือแรก
                  if(period == '01'){
                      this.hasCareFee = true
                      return careFee;
                  }
              }else if(careFeeType == '2'){ // คิดค่าดูแล มือรับ
                  if(this.isReceive){
                      this.hasCareFee = true
                      return careFee;
                  }
              }
          }
        }
        
        return 0;
    },
    getSummary(group){
        let periodReceive = group.groupDetails[0].periodReceive;
        let periodSend = group.groupDetails[0].groupSubDetails[0].periodSend
        let isReceive = periodReceive == periodSend

        let amountSend = group.groupDetails[0].groupSubDetails[0].amountSend;
        let fine = group.groupDetails[0].groupSubDetails[0].fine;
        let careFee = this.getCareFee(group);

        let sumSend = amountSend + fine + careFee 
        let sumReceive = group.amount

        return {
            text : isReceive ? "หักรับแล้วลูกแชร์ได้รับเงิน" : "ท้าวต้องได้รับเงิน",
            amount : isReceive ? sumReceive - sumSend : sumSend
        }
    },
    formatCurrency(amt){
      return numeral(amt).format(0,0)
    },
  },
  components : {
    BaseButton,
    BaseButtons,
    CardBox,
    BaseDivider,
    OverlayLayer,
    FormField,
    FormControl,
    BaseLevel
},
  props : {
    groupId: {
      type: Number,
      default: null
    },
    groupDetailId: {
      type: Number,
      default: null
    },
    groupSubDetailId: {
      type: Number,
      default: null
    },
    hasCancel: Boolean,
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    }
  }
}

</script>


