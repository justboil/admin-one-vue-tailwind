<template>
  <section class="p-6 border-b border-gray-100">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <ul>
            <li v-for="(title, index) in titleStack" :key="index" class="title-stack-item inline-block pr-3 text-2xl text-gray-500">
              {{ title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons is-right">
            <a href="https://admin-one.justboil.me/" target="_blank" class="button blue" @click.prevent="prevent">
              <icon :path="mdiCreditCard" class="mr-3" />
              <span>Premium Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Icon from '@/components/Icon'
import { mdiCreditCard } from '@mdi/js'

export default {
  name: 'TitleBar',
  components: { Icon },
  props: {
    titleStack: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const prevent = () => {
      alert('Coming soon')
    }

    return {
      prevent,
      mdiCreditCard
    }
  }
}
</script>

<style scoped>
li.title-stack-item:not(:last-child):after {
  content: '/';
  @apply inline-block pl-3;
}

li.title-stack-item:last-child {
  @apply pr-0 font-black text-black;
}
</style>
