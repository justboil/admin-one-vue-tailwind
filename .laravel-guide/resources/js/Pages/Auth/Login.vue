<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Link } from '@inertiajs/inertia-vue3'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import NotificationInCard from '@/components/NotificationInCard.vue'
import Level from '@/components/Level.vue'

const props = defineProps({
  canResetPassword: Boolean,
  status: {
    type: String,
    default: null
  }
})

const form = useForm({
  email: '',
  password: '',
  remember: []
})

useMainStore().fullScreenToggle(true)

const submit = () => {
  form
    .transform(data => ({
      ... data,
      remember: form.remember && form.remember.length ? 'on' : ''
    }))
    .post(route('login'), {
      onFinish: () => form.reset('password'),
    })
}
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="login"
    class="flex-col"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <validation-errors />

      <notification-in-card 
        v-if="status"
        color="info"
      >
        {{ status }}
      </notification-in-card>

      <field
        label="Email"
        help="Please enter your email"
      >
        <control
          v-model="form.email"
          :icon="mdiAccount"
          name="email"
          autocomplete="email"
          type="email"
        />
      </field>

      <field
        label="Password"
        help="Please enter your password"
      >
        <control
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </field>

      <check-radio-picker
        v-model="form.remember"
        name="remember"
        :options="{ remember: 'Remember' }"
      />

      <divider />

      <Level>
        <jb-buttons>
          <jb-button
            type="submit"
            color="info"
            label="Login"
          />
          <jb-button
            route-name="register"
            color="info"
            outline
            label="Register"
          />
        </jb-buttons>
        <Link
          v-if="canResetPassword"
          :href="route('password.request')"
        >
          Forgot?
        </Link>
      </Level>
    </card-component>
  </full-screen-section>
</template>
