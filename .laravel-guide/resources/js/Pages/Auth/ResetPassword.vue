<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Head, Link } from '@inertiajs/inertia-vue3'
import { mdiEmail, mdiFormTextboxPassword } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const props = defineProps({
  email: {
    type: String,
    default: null
  },
  token: {
    type: String,
    default: null
  }
})

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
})

useMainStore().fullScreenToggle(true)

const submit = () => {
  form
    .post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
  <Head title="Reset Password" />

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

      <field
        label="Email"
        label-for="email"
        help="Please enter your email"
      >
        <control
          v-model="form.email"
          :icon="mdiEmail"
          autocomplete="email"
          type="email"
          id="email"
          required
        />
      </field>

      <field
        label="Password"
        label-for="password"
        help="Please enter new password"
      >
        <control
          v-model="form.password"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          id="password"
          required
        />
      </field>

      <field
        label="Confirm Password"
        label-for="password_confirmation"
        help="Please confirm new password"
      >
        <control
          v-model="form.password_confirmation"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          id="password_confirmation"
          required
        />
      </field>

      <divider />

      <jb-button
        type="submit"
        color="info"
        label="Reset password"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      />
    </card-component>
  </full-screen-section>
</template>
