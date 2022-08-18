<script setup>
import { mdiCog } from '@mdi/js'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  iconBtn: {
    type: String,
    default: "cog"
  },
  textBtn: {
    type: String,
    default: ""
  },
  colorBtn: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <BaseIcon
        v-if="icon"
        :path="icon"
        class="mr-3"
      />
      <h1 class="text-2xl">
        {{ title }}
      </h1>
    </div>
    <BaseButton
      :icon="iconBtn"
      :label="textBtn"
      :color="colorBtn"
      small
    />
  </section>
</template>
