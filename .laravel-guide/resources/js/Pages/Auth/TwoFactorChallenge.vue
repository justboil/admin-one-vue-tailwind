<script setup>
import { useMainStore } from '@/stores/main'
import { useForm, Head } from '@inertiajs/inertia-vue3'
import { nextTick, ref } from 'vue'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Control from '@/components/Control.vue'
import Field from '@/components/Field.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import Level from '@/components/Level.vue'

useMainStore().fullScreenToggle(true)

const recovery = ref(false);

const form = useForm({
  code: '',
  recovery_code: ''
})

const recoveryCodeInput = ref(null)
const codeInput = ref(null)

const toggleRecovery = async () => {
  recovery.value ^= true

  await nextTick()

  if (recovery.value) {
    recoveryCodeInput.value?.focus()
    form.code = ''
  } else {
    codeInput.value?.focus()
    form.recovery_code = ''
  }
}

const submit = () => {
  form.post(route('two-factor.login'))
}
</script>

<template>
  <Head title="Two-factor Confirmation" />

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
      <ValidationErrors />

      <Field>
        <div class="mb-4 text-sm text-gray-600">
          <template v-if="! recovery">
            Please confirm access to your account by entering the authentication code provided by your authenticator application.
          </template>

          <template v-else>
            Please confirm access to your account by entering one of your emergency recovery codes.
          </template>
        </div>
      </Field>

      <Field
        v-if="!recovery"
        label="Code"
        label-for="code"
        help="Please enter one-time code"
      >
        <Control
          id="code"
          @set-ref="codeInput = $event"
          v-model="form.code"
          type="text"
          inputmode="numeric"
          autofocus
          autocomplete="one-time-code"
        />
      </Field>

      <Field
        v-else
        label="Recovery Code"
        label-for="recovery_code"
        help="Please enter recovery code"
      >
        <Control
          id="recovery_code"
          @set-ref="recoveryCodeInput = $event"
          v-model="form.recovery_code"
          type="text"
          class="mt-1 block w-full"
          autocomplete="one-time-code"
        />
      </Field>

      <Divider />

      <Level>
        <JbButton
          type="submit"
          color="info"
          label="Log in"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
        <button @click.prevent="toggleRecovery">
          <template v-if="!recovery">
            Use a recovery code
          </template>

          <template v-else>
            Use an authentication code
          </template>
        </button>
      </Level>
    </CardComponent>
  </FullScreenSection>
</template>
