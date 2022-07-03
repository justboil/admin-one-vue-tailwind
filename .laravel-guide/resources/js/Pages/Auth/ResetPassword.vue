<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import { useForm, Head, Link } from '@inertiajs/inertia-vue3'
import { mdiEmail, mdiFormTextboxPassword } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import FormValidationErrors from '@/components/FormValidationErrors.vue'

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

useLayoutStore().fullScreenToggle(true)

const submit = () => {
  form
    .post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
  <Head title="Reset Password" />

  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <FormValidationErrors />

      <FormField
        label="Email"
        label-for="email"
        help="Please enter your email"
      >
        <FormControl
          v-model="form.email"
          :icon="mdiEmail"
          autocomplete="email"
          type="email"
          id="email"
          required
        />
      </FormField>

      <FormField
        label="Password"
        label-for="password"
        help="Please enter new password"
      >
        <FormControl
          v-model="form.password"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          id="password"
          required
        />
      </FormField>

      <FormField
        label="Confirm Password"
        label-for="password_confirmation"
        help="Please confirm new password"
      >
        <FormControl
          v-model="form.password_confirmation"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          id="password_confirmation"
          required
        />
      </FormField>

      <BaseDivider />

      <BaseButton
        type="submit"
        color="info"
        label="Reset password"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      />
    </CardBox>
  </SectionFullScreen>
</template>
