<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, usePage, Head } from '@inertiajs/inertia-vue3'
import { computed } from 'vue'
import { mdiAccount, mdiEmail, mdiFormTextboxPassword } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: [],
})

useMainStore().fullScreenToggle(true)

const hasTermsAndPrivacyPolicyFeature = computed(() => usePage().props.value.jetstream.hasTermsAndPrivacyPolicyFeature )

const submit = () => {
  form
    .transform(data => ({
      ... data,
      terms: form.terms && form.terms.length
    }))
    .post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
  <Head title="Register" />

  <FullScreenSection
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <CardComponent
      :class="cardClass"
      class="my-24"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <ValidationErrors />

      <Field
        label="Name"
        label-for="name"
        help="Please enter your name"
      >
        <Control
          v-model="form.name"
          id="name"
          :icon="mdiAccount"
          autocomplete="name"
          type="text"
          required
        />
      </Field>

      <Field
        label="Email"
        label-for="email"
        help="Please enter your email"
      >
        <Control
          v-model="form.email"
          id="email"
          :icon="mdiEmail"
          autocomplete="email"
          type="email"
          required
        />
      </Field>

      <Field
        label="Password"
        label-for="password"
        help="Please enter new password"
      >
        <Control
          v-model="form.password"
          id="password"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          required
        />
      </Field>

      <Field
        label="Confirm Password"
        label-for="password_confirmation"
        help="Please confirm your password"
      >
        <Control
          v-model="form.password_confirmation"
          id="password_confirmation"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          required
        />
      </Field>

      <CheckRadioPicker
        v-if="hasTermsAndPrivacyPolicyFeature"
        v-model="form.terms"
        name="remember"
        :options="{ agree: 'I agree to the Terms' }"
      />

      <Divider />

      <JbButtons>
        <JbButton
          type="submit"
          color="info"
          label="Register"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
        <JbButton
          route-name="login"
          color="info"
          outline
          label="Login"
        />
      </JbButtons>
    </CardComponent>
  </FullScreenSection>
</template>
