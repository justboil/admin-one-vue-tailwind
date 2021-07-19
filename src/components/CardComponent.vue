<template>
  <component
    :is="form ? 'form' : 'div'"
    class="card bg-white border border-gray-100 rounded"
    :class="[mb, form ? 'block' : '']"
    @submit="submit"
  >
    <header v-if="title" class="flex items-stretch border-b border-gray-100">
      <p class="flex items-center py-3 flex-grow font-bold" :class="[ icon ? 'px-4' : 'px-6' ]">
        <icon v-if="icon" :path="icon" class="mr-3" />
        {{ title }}
      </p>
      <a
        v-if="headerIcon"
        href="#"
        class="flex items-center py-3 px-4 justify-center"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <icon :path="headerIcon" />
      </a>
    </header>
    <div v-if="empty" class="text-center py-24 text-gray-500">
      <p>Nothing's here…</p>
    </div>
    <div v-else :class="{'p-6':!hasTable}">
      <slot />
    </div>
  </component>
</template>

<script>
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
    mb: {
      type: String,
      default: 'mb-6 last:mb-0'
    }
  },
  emits: ['header-icon-click', 'submit'],
  setup (props, { emit }) {
    const headerIconClick = () => {
      emit('header-icon-click')
    }

    const submit = e => {
      emit('submit', e)
    }

    return { headerIconClick, submit }
  }
}
</script>
