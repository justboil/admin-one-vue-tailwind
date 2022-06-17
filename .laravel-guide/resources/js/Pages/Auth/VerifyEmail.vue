<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Head, Link } from '@inertiajs/inertia-vue3'
import { computed } from 'vue'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Field from '@/components/Field.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import NotificationInCard from '@/components/NotificationInCard.vue'
import Level from '@/components/Level.vue'

const props = defineProps({
  status: {
    type: String,
    default: null
  }
})

const form = useForm()

useMainStore().fullScreenToggle(true)

const verificationLinkSent = computed(() => props.status === 'verification-link-sent')

const submit = () => {
  form.post(route('verification.send'))
}
</script>

<template>
  <Head title="Email Verification" />

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
        v-if="verificationLinkSent"
        color="info"
      >
        A new verification link has been sent to the email address you provided during registration.
      </notification-in-card>

      <field>
        <div class="mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>
      </field>

      <divider />

      <Level>
        <jb-button
          type="submit"
          color="info"
          label="Resend Verification Email"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
        <Link
          :href="route('logout')"
          method="post"
          as="button"
        >
          Logout
        </Link>
      </Level>
    </card-component>
  </full-screen-section>
</template>
