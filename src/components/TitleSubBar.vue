<template>
  <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <icon v-if="icon" :path="icon" class="mr-3"/>
      <h1 class="text-2xl">{{ title }}</h1>
    </div>
    <jb-button :icon="mdiCog" small />
  </section>
</template>

<script>
import { mdiCog } from '@mdi/js'
import Icon from '@/components/Icon'
import JbButton from '@/components/JbButton'

export default {
  name: 'TitleSubBar',
  components: {
    Icon,
    JbButton
  },
  props: {
    icon: String,
    title: String
  },
  setup () {
    return {
      mdiCog
    }
  }
}
</script>
