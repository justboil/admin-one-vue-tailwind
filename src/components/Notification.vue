<template>
  <div v-if="!isDismissed" :class="componentClass">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="flex items-center">
            <icon v-if="icon" :path="icon" class="mr-2" />
            <span><slot /></span>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button type="button" class="button small textual" @click="dismiss">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Icon from '@/components/Icon'

export default {
  name: 'Notification',
  components: {
    Icon
  },
  props: {
    icon: String,
    color: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isDismissed = ref(false)

    const dismiss = () => {
      isDismissed.value = true
    }

    const componentClass = computed(() => {
      const base = 'notification px-3 py-6 rounded'

      const colorMap = {
        blue: 'bg-blue-500 text-white',
        green: 'bg-green-500 text-white',
        red: 'bg-red-500 text-white'
      }

      if (colorMap[props.color]) {
        return `${base} ${colorMap[props.color]}`
      }

      return base
    })

    return { isDismissed, dismiss, componentClass }
  }
}
</script>

<style scoped>
.notification:not(:last-child) {
  @apply mb-6;
}
</style>
