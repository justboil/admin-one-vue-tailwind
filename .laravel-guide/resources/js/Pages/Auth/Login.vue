<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import { useForm, Head, Link } from '@inertiajs/inertia-vue3'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import FormValidationErrors from '@/components/FormValidationErrors.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import BaseLevel from '@/components/BaseLevel.vue'

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

useLayoutStore().fullScreenToggle(true)

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

      <NotificationBarInCard 
        v-if="status"
        color="info"
      >
        {{ status }}
      </NotificationBarInCard>

      <FormField
        label="Email"
        label-for="email"
        help="Please enter your email"
      >
        <FormControl
          v-model="form.email"
          :icon="mdiAccount"
          id="email"
          autocomplete="email"
          type="email"
          required
        />
      </FormField>

      <FormField
        label="Password"
        label-for="password"
        help="Please enter your password"
      >
        <FormControl
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          id="password"
          autocomplete="current-password"
          required
        />
      </FormField>

      <FormCheckRadioPicker
        v-model="form.remember"
        name="remember"
        :options="{ remember: 'Remember' }"
      />

      <BaseDivider />

      <BaseLevel>
        <BaseButtons>
          <BaseButton
            type="submit"
            color="info"
            label="Login"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          />
          <BaseButton
            v-if="canResetPassword"
            route-name="password.request"
            color="info"
            outline
            label="Remind"
          />
        </BaseButtons>
        <Link
          :href="route('register')"
        >
          Register
        </Link>
      </BaseLevel>
    </CardBox>
  </SectionFullScreen>
</template>
