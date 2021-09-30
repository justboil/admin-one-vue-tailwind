<template>
  <component
    :is="form ? 'form' : 'div'"
    class="bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-900"
    :class="[rounded]"
    @submit="submit"
  >
    <header
      v-if="title"
      class="flex items-stretch border-b border-gray-100 dark:border-gray-700">
      <p class="flex items-center py-3 flex-grow font-bold" :class="[ icon ? 'px-4' : 'px-6' ]">
        <icon v-if="icon" :path="icon" class="mr-3" />
        {{ title }}
      </p>
      <a
        v-if="computedHeaderIcon"
        href="#"
        class="flex items-center py-3 px-4 justify-center ring-blue-700 focus:ring"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <icon :path="computedHeaderIcon" />
      </a>
    </header>
    <div v-if="empty" class="text-center py-24 text-gray-500 dark:text-gray-400">
      <p>Nothing's here…</p>
    </div>
    <div v-else :class="{'p-6':!hasTable}">
      <slot />
    </div>
  </component>
</template>

<script>
import { mdiCog } from '@mdi/js'
import { computed } from 'vue'
import Icon from '@/components/Icon'

export default {
  name: 'CardComponent',
  components: { Icon },
  props: {
    title: String,
    icon: String,
    headerIcon: String,
    hasTable: Boolean,
    empty: Boolean,
    form: Boolean,
    rounded: {
      type: String,
      default: 'md:rounded'
    }
  },
  emits: ['header-icon-click', 'submit'],
  setup (props, { emit }) {
    const computedHeaderIcon = computed(() => props.headerIcon ?? mdiCog)

    const headerIconClick = () => {
      emit('header-icon-click')
    }

    // const headerFooterBorder = 'border-gray-100 dark:border-gray-700'

    // const headerBorder = 'border-b'

    const submit = e => {
      emit('submit', e)
    }

    return {
      computedHeaderIcon,
      headerIconClick,
      // headerFooterBorder,
      // headerBorder,
      submit
    }
  }
}
</script>
