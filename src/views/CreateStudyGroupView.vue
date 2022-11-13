<script setup>
import SectionFullScreen from "/src/components/SectionFullScreen.vue";
import CardBox from "/src/components/CardBox.vue";
import BaseButton from "/src/components/BaseButton.vue";
import BaseButtons from "/src/components/BaseButtons.vue";
import LayoutGuest from "/src/layouts/LayoutGuest.vue";
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="pinkRed">
      <CardBox :class="cardClass">
        <div class="space-y-3">
          <h1 class="text-2xl">Unhandled exception</h1>

          <p>An Error Occurred</p>
        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton label="Done" to="/dashboard" color="danger" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
