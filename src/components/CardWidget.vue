<template>
  <card-component v-bind="$attrs">
    <div class="level mobile card-widget">
      <div class="level-item">
        <div>
          <h3 class="text-lg leading-tight text-gray-500">
            {{ label }}
          </h3>
          <h1 class="text-3xl leading-tight font-semibold">
            <growing-number :value="number" :prefix="prefix" :suffix="suffix" />
          </h1>
        </div>
      </div>
      <div v-if="icon" class="level-item">
        <icon :icon="icon" size="48px" w="20" h="20" :class="color" />
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import GrowingNumber from '@/components/GrowingNumber'
import Icon from '@/components/Icon'

export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent, Icon },
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
