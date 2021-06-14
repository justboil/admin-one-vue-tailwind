<template>
  <div class="card bg-white border border-gray-100 rounded">
    <header v-if="title" class="flex items-stretch border-b border-gray-100">
      <p class="flex items-center py-3 px-4 flex-grow font-bold">
        <icon v-if="icon" :icon="icon" />
        {{ title }}
      </p>
      <a
        v-if="headerIcon"
        href="#"
        class="flex items-center py-3 px-4 justify-center"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <icon :icon="headerIcon" />
      </a>
    </header>
    <div v-if="isEmpty" class="text-center py-12 text-gray-500">
      <div>
        <span class="icon large"><i class="mdi mdi-emoticon-sad mdi-48px"></i></span>
      </div>
      <p>Nothing's here…</p>
    </div>
    <div v-else :class="{'p-6':!hasTable}">
      <slot />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'CardComponent',
  components: { Icon },
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    },
    hasTable: {
      type: Boolean,
      default: false
    },
    isEmpty: {
      type: Boolean,
      default: false
    }
  },
  emits: ['header-icon-click'],
  setup (props, { emit }) {
    const headerIconClick = () => {
      emit('header-icon-click')
    }

    return { headerIconClick }
  }
}
</script>

<style scoped>
.card:not(:last-child) {
  @apply mb-6;
}
</style>
