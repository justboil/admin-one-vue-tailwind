<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Head } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Control from '@/components/Control.vue'
import Field from '@/components/Field.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

useMainStore().fullScreenToggle(true)

const form = useForm({
  password: ''
})

const passwordInput = ref(null)

const submit = () => {
  form.post(route('password.confirm'), {
    onFinish: () => {
      form.reset()

      passwordInput.value?.focus()
    }
  })
}
</script>

<template>
  <Head title="Secure Area" />

  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <validation-errors />

      <field>
        <div class="mb-4 text-sm text-gray-600">
          This is a secure area of the application. Please confirm your password before continuing.
        </div>
      </field>

      <field
        label="Password"
        label-for="password"
        help="Please enter your password to confirm"
      >
        <control
          id="password"
          @set-ref="passwordInput = $event"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
        />
      </field>

      <divider />

      <jb-button
        type="submit"
        color="info"
        label="Confirm"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      />
    </card-component>
  </full-screen-section>
</template>
