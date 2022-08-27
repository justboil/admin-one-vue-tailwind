<script setup>
import { computed } from 'vue'
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTag from '@/components/PillTag.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import NumberDynamic from '@/components/NumberDynamic.vue'
import numeral from 'numeral'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  subText: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amt: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: null
  }
})

const pillType = computed(() => {
  if (props.type) {
    return props.type
  }

  if (props.amt) {
    if (props.amt >= 60) {
      return 'success'
    }
    if (props.amt >= 40) {
      return 'warning'
    }

    return 'danger'
  }

  return 'info'
})



</script>

<template>
  <CardBox
    class="mb-6 last:mb-0"
    hoverable
  >
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar
          class="w-12 h-12 md:mr-6"
          :username="name"
        />
        <div class="text-center md:text-left">
          <h4 class="text-xl">
            {{ name }} 
          </h4>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ subText }}
          </p>
        </div>
      </BaseLevel>
      <h1 class="text-3xl leading-tight font-semibold text-red-500">
        <NumberDynamic
          :value="amt"
          prefix="$"
          :suffix="suffix"
        />
      </h1>
    </BaseLevel>
  </CardBox>
</template>
