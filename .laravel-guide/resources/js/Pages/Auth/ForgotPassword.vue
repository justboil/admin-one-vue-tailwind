<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Head, Link } from '@inertiajs/inertia-vue3'
import { mdiEmail } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import NotificationInCard from '@/components/NotificationInCard.vue'
import Level from '@/components/Level.vue'

defineProps({
  status: {
    type: String,
    default: null
  }
})

const form = useForm({
  email: ''
})

useMainStore().fullScreenToggle(true)

const submit = () => {
  form.post(route('password.email'))
}
</script>

<template>
  <Head title="Forgot Password" />

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

      <field>
        <div class="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>
      </field>

      <field
        label="Email"
        help="Please enter your email"
      >
        <control
          v-model="form.email"
          :icon="mdiEmail"
          autocomplete="email"
          type="email"
          required
        />
      </field>

      <divider />

      <Level>
        <jb-button
          type="submit"
          color="info"
          label="Email link"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
        <Link
          :href="route('login')"
        >
          Back to login
        </Link>
      </Level>
    </card-component>
  </full-screen-section>
</template>
