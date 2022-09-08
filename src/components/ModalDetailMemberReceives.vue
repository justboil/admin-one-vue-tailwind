<template>
    <OverlayLayer v-show="value">
        <CardBox v-show="value" title="รายละเอียดยอดรับวันนี้"
            class="shadow-lg w-full  overflow-y-auto md:w-3/5 lg:w-1/1 z-50" header-icon="close" modal form
            @submit.prevent="createGroup" @header-icon-click="cancel">
            <div class="grid lg:grid-cols-4 grid-cols-2 gap-5">
                
            </div>


            <BaseDivider />

            <BaseButtons type="justify-center">
                <BaseButton :label="buttonLabel" color="success" type="submit" icon="checkCircleOutline" />
                <BaseButton v-if="hasCancel" label="ยกเลิก" color="danger" icon="close" @click="cancel" />
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

export default {
    data() {
        return {
            items: [
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
            ],
            perPage: 10,
            currentPage: 0,
        }
    },
    emits: ['update:modelValue', 'cancel', 'confirm'],
    computed: {
        value: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue)
            }
        },
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
    methods: {
        confirmCancel(mode) {
            this.value = false
            this.$emit(mode)
        },
        confirm() {
            this.confirmCancel('confirm')
        },
        cancel() {
            this.confirmCancel('cancel')
        },
        formatCurrency(amt) {
            return numeral(amt).format(0, 0)
        }
    },
    components: {
        BaseButton,
        BaseButtons,
        CardBox,
        BaseDivider,
        OverlayLayer,
        FormField,
        FormControl
    },
    props: {
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
  
  
  