<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Head, Link } from '@inertiajs/inertia-vue3'
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
  <Head title="Login" />

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

      <notification-in-card 
        v-if="status"
        color="info"
      >
        {{ status }}
      </notification-in-card>

      <field
        label="Email"
        label-for="email"
        help="Please enter your email"
      >
        <control
          v-model="form.email"
          :icon="mdiAccount"
          id="email"
          autocomplete="email"
          type="email"
          required
        />
      </field>

      <field
        label="Password"
        label-for="password"
        help="Please enter your password"
      >
        <control
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          id="password"
          autocomplete="current-password"
          required
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
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          />
          <jb-button
            v-if="canResetPassword"
            route-name="password.request"
            color="info"
            outline
            label="Remind"
          />
        </jb-buttons>
        <Link
          :href="route('register')"
        >
          Register
        </Link>
      </Level>
    </card-component>
  </full-screen-section>
</template>
