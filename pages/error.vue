<script setup>

</script>

<template>
  <div>
    <NuxtLayout>
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
    </NuxtLayout>
  </div>
</template>
