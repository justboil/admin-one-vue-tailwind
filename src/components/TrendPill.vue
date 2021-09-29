<template>
  <pill :text="trend" :type="trendStyle.style" :icon="trendStyle.icon" :small="small"/>
</template>

<script>
import { computed } from 'vue'
import { mdiChevronUp, mdiChevronDown, mdiAlertCircleOutline } from '@mdi/js'
import Pill from '@/components/Pill'

export default {
  name: 'CardWidget',
  components: { Pill },
  props: {
    trend: String,
    trendType: String,
    small: Boolean
  },
  setup (props) {
    const trendStyle = computed(() => {
      if (props.trendType === 'up') {
        return {
          icon: mdiChevronUp,
          style: 'success'
        }
      }

      if (props.trendType === 'down') {
        return {
          icon: mdiChevronDown,
          style: 'danger'
        }
      }

      if (props.trendType === 'alert') {
        return {
          icon: mdiAlertCircleOutline,
          style: 'warning'
        }
      }

      return {
        style: 'info'
      }
    })

    return {
      trendStyle
    }
  }
}
</script>
