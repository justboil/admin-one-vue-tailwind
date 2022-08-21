<template>
  <OverlayLayer
    v-show="value"
    @overlay-click="cancel"
  >
    <CardBox
      v-show="value"
      title="สร้าวงแชร์"
      class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-1/1 z-50"
      header-icon="close"
      modal
      form
      @submit.prevent="createGroup"
      @header-icon-click="cancel"
    >

      <div class="grid lg:grid-cols-4 gap-5">
        <FormField label="ชื่อวง">
          <FormControl
            v-model="create.name"
            icon="home"
            required
          />
        </FormField>
        <FormField label="ประเภทวงแชร์">
          <FormControl
            v-model="create.type"
            :options="types"
            icon=""
            required
          />
        </FormField>
        <FormField label="เงินต้น">
          <FormControl
            v-model="create.amount"
            icon="cash"
            type="number"
            required
          />
        </FormField>
        <FormField label="จำนวนมือ">
          <FormControl
            v-model="create.numOfPlayer"
            icon="accountMultiple"
            type="number"
            required
          />
        </FormField>
      </div>

      <div v-if="create.type == 2" class="grid lg:grid-cols-4 gap-5">
        <FormField label="ยอดส่งต่องวด" >
          <FormControl
            v-model="create.baseAmountSend"
            type="number"
          />
        </FormField>
        <FormField label="ดอกเบี้ยเริ่มต้น" >
          <FormControl
            v-model="create.bitStart"
            type="number"
          />
        </FormField>
        <FormField label="บิทเพิ่มครั้งละ" >
          <FormControl
            v-model="create.bitUp"
            type="number"
          />
        </FormField>
        <FormField label="อั้น" >
          <FormControl
            v-model="create.bitLimit"
            type="number"
          />
        </FormField>
      </div>

      <div class="grid lg:grid-cols-4 gap-5">
        <FormField label="ค่าดูแล" >
          <FormControl
            v-model="create.careFee"
            type="number"
          />
        </FormField>
        <FormField label="ชำระเมื่อ" >
          <FormControl
            v-model="create.careFeeType"
            :options="[{ id :1  ,label : 'งวดแรก'},{ id : 2 , label : 'เมื่อได้รับเงิน' }]"
            required
          />
        </FormField>
        <FormField label="รอบการส่งเงิน" >
          <FormControl
            v-model="create.payRound"
            type="number"
            required
          />
        </FormField>
        <FormField label="ราย" >
          <FormControl
            v-model="create.payType"
            :options="[{ id : 1 ,label : 'รายวัน'},{ id : 2 , label : 'ทุกวันที่' }]"
            required
          />
        </FormField>
      </div>

      <div class="grid lg:grid-cols-4 gap-5">
        <FormField label="ค่าปรับส่งช้า/วัน" >
          <FormControl
            v-model="create.finePerDay"
            type="number"
          />
        </FormField>
        <FormField label="ค่าปรับตัดรอบเวลา" >
          <FormControl
            v-model="create.fineTime"
            type="number"
          />
        </FormField>
        <FormField label="ค่าปรับจบวง/วัน" >
          <FormControl
            v-model="create.fineFinishGroup"
            type="number"
          />
        </FormField>
        <FormField label="คำนวณค่าปรับอัตโนมัติ" >
          <FormControl
            v-model="create.scheduleConfig"
            :options="[{ id : 'Y' ,label : 'คำนวณ'},{ id : 'N' , label : 'ไม่คำนวณ' }]"
          />
        </FormField>
      </div>

      <FormField
          label="รายละเอียดเพิมเติม"
          help="Your question. Max 255 characters"
        >
          <FormControl
            type="textarea"
            placeholder="รายละเอียดเพิมเติม"
            v-model="create.remark"
          />
      </FormField>


      <BaseDivider />

      <BaseButtons
        type="justify-center"
      >
        <BaseButton
          :label="buttonLabel"
          :color="button"
          type="submit"
        />
        <BaseButton
          v-if="hasCancel"
          label="ยกเลิก"
          color="danger"
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

export default {
  data () {
    return {
      create : {
        name : "วงรี",
        type : "1",
        amount : 50000,
        numOfPlayer : 10,
        baseAmountSend : "",
        bitStart : 0,
        bitUp : 0,
        bitLimit : 0,
        careFee : 200,
        careFeeType : 1,
        payRound : 1,
        payType : 1,
        finePerDay : 100,
        fineTime : 0,
        fineFinishGroup : 300,
        scheduleConfig : 'Y',
        remark : ''
      },
      types : [
        { id: 1, label: 'ขั้นบันได' },
        { id: 2, label: 'บิทดอกตาม' },
        { id: 3, label: 'เรทดอกตาม' }
      ],
    }
  },
  emits:['update:modelValue', 'cancel', 'confirm'],
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
    async createGroup(){
      const resp = await GroupService.createGroup(this.create);
      if(resp){
        this.value = false
        this.confirmCancel('confirm')
      }
    }
  },
  components : {
    BaseButton,
    BaseButtons,
    CardBox,
    BaseDivider,
    OverlayLayer,
    FormField,
    FormControl
  },
  props : {
    title: {
      type: String,
      default: null
    },
    largeTitle: {
      type: String,
      default: null
    },
    button: {
      type: String,
      default: 'info'
    },
    buttonLabel: {
      type: String,
      default: 'Done'
    },
    hasCancel: Boolean,
    modelValue: {
      type: [String, Number, Boolean],
      default: null
    }
  }
}

</script>


