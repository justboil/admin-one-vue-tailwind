<script setup>
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="error"
  >
    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
    >
      <div class="space-y-3">
        <h1 class="text-2xl">
          Unhandled exception
        </h1>

        <p>An Error Occurred</p>
      </div>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          label="Done"
          to="/dashboard"
          color="danger"
        />
      </BaseButtons>
    </CardBox>
  </SectionFullScreen>
</template>
