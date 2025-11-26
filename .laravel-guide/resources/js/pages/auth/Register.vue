<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseDivider from '@/components/BaseDivider.vue';
import CardBox from '@/components/CardBox.vue';
import FormControl from '@/components/FormControl.vue';
import FormField from '@/components/FormField.vue';
import FormValidationErrors from '@/components/FormValidationErrors.vue';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import LayoutGuest from '@/layouts/LayoutGuest.vue';
import { login } from '@/routes';
import register from '@/routes/register';
import { Head, useForm } from '@inertiajs/vue3';
import { mdiAccount, mdiEmail, mdiFormTextboxPassword } from '@mdi/js';

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form
    .transform((data) => ({
      ...data,
      terms: form.terms && form.terms.length,
    }))
    .post(register.store().url, {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
  <LayoutGuest>
    <Head title="Register" />

    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" class="my-24" is-form @submit.prevent="submit">
        <FormValidationErrors />

        <FormField label="Name" label-for="name" help="Please enter your name">
          <FormControl
            v-model="form.name"
            id="name"
            :icon="mdiAccount"
            autocomplete="name"
            type="text"
            required
          />
        </FormField>

        <FormField label="Email" label-for="email" help="Please enter your email">
          <FormControl
            v-model="form.email"
            id="email"
            :icon="mdiEmail"
            autocomplete="email"
            type="email"
            required
          />
        </FormField>

        <FormField label="Password" label-for="password" help="Please enter new password">
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

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            type="submit"
            color="info"
            label="Register"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          />
          <BaseButton :route="login()" color="info" outline label="Login" />
        </BaseButtons>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
