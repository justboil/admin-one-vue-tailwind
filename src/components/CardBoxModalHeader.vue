<script setup>
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  hasCancel: Boolean,
})

const emit = defineEmits(['cancel'])
</script>

<template>
  <div class="px-6 pt-6">
    <CardBoxComponentTitle :title="title">
      <BaseButton
        v-if="hasCancel"
        :icon="mdiClose"
        color="whiteDark"
        small
        rounded-full
        @click.prevent="emit('cancel')"
      />
    </CardBoxComponentTitle>
  </div>
</template>
