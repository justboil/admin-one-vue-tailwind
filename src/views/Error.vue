<template>
  <full-screen-section bg="error" v-slot="{ cardClass, cardRounded }">
    <card-component :class="cardClass" :rounded="cardRounded">

      <div class="space-y-3">
        <h1 class="text-2xl">Unhandled exception</h1>

        <p>An Error Occurred</p>
      </div>

      <divider />

      <jb-buttons>
        <jb-button label="Done" to="/" color="danger" />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>

<script>
import FullScreenSection from '@/components/FullScreenSection'
import CardComponent from '@/components/CardComponent'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'

export default {
  name: 'Error',
  components: {
    FullScreenSection,
    CardComponent,
    Divider,
    JbButton,
    JbButtons
  }
}
</script>
