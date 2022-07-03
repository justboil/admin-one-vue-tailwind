<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import { useForm, usePage, Head } from '@inertiajs/inertia-vue3'
import { computed } from 'vue'
import { mdiAccount, mdiEmail, mdiFormTextboxPassword } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import FormValidationErrors from '@/components/FormValidationErrors.vue'

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: [],
})

useLayoutStore().fullScreenToggle(true)

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

  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <CardBox
      :class="cardClass"
      class="my-24"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <FormValidationErrors />

      <FormField
        label="Name"
        label-for="name"
        help="Please enter your name"
      >
        <FormControl
          v-model="form.name"
          id="name"
          :icon="mdiAccount"
          autocomplete="name"
          type="text"
          required
        />
      </FormField>

      <FormField
        label="Email"
        label-for="email"
        help="Please enter your email"
      >
        <FormControl
          v-model="form.email"
          id="email"
          :icon="mdiEmail"
          autocomplete="email"
          type="email"
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
          id="password"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          required
        />
      </FormField>

      <FormField
        label="Confirm Password"
        label-for="password_confirmation"
        help="Please confirm your password"
      >
        <FormControl
          v-model="form.password_confirmation"
          id="password_confirmation"
          :icon="mdiFormTextboxPassword"
          type="password"
          autocomplete="new-password"
          required
        />
      </FormField>

      <FormCheckRadioPicker
        v-if="hasTermsAndPrivacyPolicyFeature"
        v-model="form.terms"
        name="remember"
        :options="{ agree: 'I agree to the Terms' }"
      />

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          type="submit"
          color="info"
          label="Register"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
        <BaseButton
          route-name="login"
          color="info"
          outline
          label="Login"
        />
      </BaseButtons>
    </CardBox>
  </SectionFullScreen>
</template>
