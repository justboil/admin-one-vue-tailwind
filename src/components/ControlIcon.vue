<template>
  <icon :path="icon" w="w-10" h="h-10" class="absolute top-0 z-10" :class="{'left-0':!isRight, 'right-0':isRight}" />
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'ControlIcon',
  components: {
    Icon
  },
  props: {
    icon: {
      type: String
    },
    isRight: {
      type: Boolean
    }
  }
}
</script>
