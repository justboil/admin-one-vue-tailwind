<template>
  <card-component
    class="mb-6 last:mb-0"
    hoverable
  >
    <level>
      <level type="justify-start">
        <user-avatar
          class="w-12 h-12 md:mr-6"
          :username="name"
        />
        <div class="text-center md:text-left">
          <h4 class="text-xl">
            {{ name }} <span class="text-gray-500 dark:text-gray-400">@{{ login }}</span>
          </h4>
          <p class="text-gray-500 dark:text-gray-400">
            {{ date }}
          </p>
        </div>
      </level>
      <pill
        :type="pillType"
        :text="pillText"
        :icon="pillIcon"
      />
    </level>
  </card-component>
</template>

<script>
import { computed } from 'vue'
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from '@mdi/js'
import CardComponent from '@/components/CardComponent.vue'
import Level from '@/components/Level.vue'
import Pill from '@/components/Pill.vue'
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'CardClientBar',
  components: { CardComponent, Level, Pill, UserAvatar },
  props: {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    progress: {
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
  },
  setup (props) {
    const pillType = computed(() => {
      if (props.type) {
        return props.type
      }

      if (props.progress) {
        if (props.progress >= 60) {
          return 'success'
        }
        if (props.progress >= 40) {
          return 'warning'
        }

        return 'danger'
      }

      return 'info'
    })

    const pillIcon = computed(() => {
      return {
        success: mdiTrendingUp,
        warning: mdiTrendingNeutral,
        danger: mdiTrendingDown,
        info: null
      }[pillType.value]
    })

    const pillText = computed(() => props.text ?? `${props.progress}%`)

    return {
      pillType,
      pillIcon,
      pillText
    }
  }
}
</script>
