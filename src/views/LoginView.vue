<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'

const form = reactive({
  login: 'john.doe',
  pass: 'highly-secure-password-fYjUw-',
  remember: ['remember']
})

const router = useRouter()

const submit = () => {
  router.push('/dashboard')
}
</script>

<template>
  <FullScreenSection
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <CardComponent
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <Field
        label="Login"
        help="Please enter your login"
      >
        <Control
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </Field>

      <Field
        label="Password"
        help="Please enter your password"
      >
        <Control
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </Field>

      <CheckRadioPicker
        v-model="form.remember"
        name="remember"
        :options="{ remember: 'Remember' }"
      />

      <Divider />

      <JbButtons>
        <JbButton
          type="submit"
          color="info"
          label="Login"
        />
        <JbButton
          to="/dashboard"
          color="info"
          outline
          label="Back"
        />
      </JbButtons>
    </CardComponent>
  </FullScreenSection>
</template>
