<template>
  <card-component mb="">
    <level mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500">
          {{ label }}
        </h3>
        <h1 class="text-3xl leading-tight font-semibold">
          <growing-number :value="number" :prefix="prefix" :suffix="suffix" />
        </h1>
      </div>
      <icon v-if="icon" :path="icon" size="48" w="w-20" h="h-20" :class="color" />
    </level>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import GrowingNumber from '@/components/GrowingNumber'
import Icon from '@/components/Icon'
import Level from '@/components/Level'

export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent, Icon, Level },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
}
</script>
