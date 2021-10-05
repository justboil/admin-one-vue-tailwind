<template>
  <icon :path="icon" class="transition-colors" />
  <span class="px-2 transition-colors" :class="{'lg:hidden':isDesktopIconOnly}">{{ label }}</span>
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
    isDesktopIconOnly: Boolean
  }
}
</script>
