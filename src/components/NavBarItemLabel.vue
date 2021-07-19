<template>
  <icon :path="icon" />
  <span class="px-2" :class="{'lg:hidden':isDesktopIconOnly}">{{ label }}</span>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'NavBarItemLabel',
  components: { Icon },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isDesktopIconOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
