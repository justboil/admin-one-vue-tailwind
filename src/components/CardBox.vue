<script setup>
import { computed, useSlots } from 'vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import CardBoxComponentFooter from '@/components/CardBoxComponentFooter.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'

const props = defineProps({
  rounded: {
    type: String,
    default: 'rounded-2xl'
  },
  flex: {
    type: String,
    default: 'flex-col'
  },
  title: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  headerButtonIcon: {
    type: String,
    default: null
  },
  hasComponentLayout: Boolean,
  hasTable: Boolean,
  form: Boolean,
  isHoverable: Boolean,
  modal: Boolean
})

const emit = defineEmits(['submit', 'header-button-click'])

const slots = useSlots()

const hasFooterSlot = computed(() => slots.footer && !!slots.footer())

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.flex,
    props.modal ? 'dark:bg-slate-900' : 'dark:bg-slate-900/70'
  ]

  if (props.isHoverable) {
    base.push('hover:shadow-lg transition-shadow duration-500')
  }

  return base
})

const submit = event => {
  emit('submit', event)
}

const headerButtonClick = event => {
  emit('header-button-click', event)
}
</script>

<template>
  <component
    :is="form ? 'form' : 'div'"
    :class="componentClass"
    class="bg-white flex"
    @submit="submit"
  >
    <slot v-if="hasComponentLayout" />
    <template v-else>
      <CardBoxComponentHeader
        v-if="title"
        :title="title"
        :icon="icon"
        :button-icon="headerButtonIcon"
        @button-click="headerButtonClick"
      />
      <CardBoxComponentBody :no-padding="hasTable">
        <slot />
      </CardBoxComponentBody>
      <CardBoxComponentFooter v-if="hasFooterSlot">
        <slot name="footer" />
      </CardBoxComponentFooter>
    </template>
  </component>
</template>
