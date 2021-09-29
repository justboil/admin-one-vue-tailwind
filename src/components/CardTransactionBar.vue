<template>
  <card-component class="mb-6 last:mb-0" hoverable>
    <level>
      <level type="justify-start">
        <icon-rounded :icon="icon.icon" :type="icon.type" class="md:mr-6"/>
        <div class="text-center space-y-1 md:text-left md:mr-6">
          <h4 class="text-xl">${{ amount }}</h4>
          <p class="text-gray-500 dark:text-gray-400"><b>{{ date }}</b> via {{ business }}</p>
        </div>
      </level>
      <div class="text-center md:text-right space-y-1">
        <p>{{ name }}</p>
        <div><pill type="info" :text="account" small/> <pill :type="icon.type" :text="type" small/></div>
      </div>
    </level>
  </card-component>
</template>

<script>
import { computed } from 'vue'
import { mdiCashMinus, mdiCashPlus, mdiReceipt, mdiCreditCardOutline } from '@mdi/js'
import CardComponent from '@/components/CardComponent'
import Level from '@/components/Level'
import Pill from '@/components/Pill'
import IconRounded from '@/components/IconRounded'

export default {
  name: 'CardProductBar',
  components: { CardComponent, Level, Pill, IconRounded },
  props: {
    amount: Number,
    date: String,
    business: String,
    type: String,
    name: String,
    account: String
  },
  setup (props) {
    const icon = computed(() => {
      if (props.type === 'withdrawal') {
        return {
          icon: mdiCashMinus,
          type: 'danger'
        }
      } else if (props.type === 'deposit') {
        return {
          icon: mdiCashPlus,
          type: 'success'
        }
      } else if (props.type === 'invoice') {
        return {
          icon: mdiReceipt,
          type: 'warning'
        }
      }

      return {
        icon: mdiCreditCardOutline,
        type: 'info'
      }
    })

    return {
      icon
    }
  }
}
</script>
