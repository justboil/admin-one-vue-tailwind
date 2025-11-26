<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseDivider from '@/components/BaseDivider.vue';
import CardBox from '@/components/CardBox.vue';
import FormControl from '@/components/FormControl.vue';
import FormField from '@/components/FormField.vue';
import FormValidationErrors from '@/components/FormValidationErrors.vue';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import LayoutGuest from '@/layouts/LayoutGuest.vue';
import password from '@/routes/password';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const form = useForm({
  password: '',
});

const passwordInput = ref(null);

const submit = () => {
  form.post(password.confirm.store().url, {
    onFinish: () => {
      form.reset();

      passwordInput.value?.focus();
    },
  });
};
</script>

<template>
  <LayoutGuest>
    <Head title="Secure Area" />

    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormValidationErrors />

        <FormField>
          <div class="mb-4 text-sm text-gray-600">
            This is a secure area of the application. Please confirm your password before
            continuing.
          </div>
        </FormField>

        <FormField
          label="Password"
          label-for="password"
          help="Please enter your password to confirm"
        >
          <FormControl
            id="password"
            @set-ref="passwordInput = $event"
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
          />
        </FormField>

        <BaseDivider />

        <BaseButton
          type="submit"
          color="info"
          label="Confirm"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
