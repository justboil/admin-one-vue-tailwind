<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseDivider from '@/components/BaseDivider.vue';
import CardBox from '@/components/CardBox.vue';
import CardBoxModal from '@/components/CardBoxModal.vue';
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue';
import FormControl from '@/components/FormControl.vue';
import FormField from '@/components/FormField.vue';
import NotificationBarInCard from '@/components/NotificationBarInCard.vue';
import SectionMain from '@/components/SectionMain.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import password from '@/routes/password';
import profile from '@/routes/profile';
import twoFactor from '@/routes/two-factor';
import { send } from '@/routes/verification';
import { darkModeKey, useDarkModeStore } from '@/stores/darkMode';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { mdiAccount, mdiAsterisk, mdiFormTextboxPassword, mdiGithub, mdiMail } from '@mdi/js';
import { ref, watch } from 'vue';

defineProps({
  mustVerifyEmail: Boolean,
  status: String,
});

const page = usePage();
const user = page.props.auth.user;

const profileForm = useForm({
  name: page.props.auth.user.name,
  email: page.props.auth.user.email,
});

const submitProfile = () => {
  profileForm.patch(profile.update().url, { preserveScroll: true });
};

const passwordForm = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const submitPassword = () => {
  passwordForm.put(password.update().url, {
    preserveScroll: true,
    onSuccess: () => passwordForm.reset(),
  });
};

let appearanceDefault = 'system';

if (typeof localStorage !== 'undefined' && localStorage[darkModeKey]) {
  appearanceDefault = localStorage[darkModeKey] === '1' ? 'dark' : 'light';
}

const appearance = ref(appearanceDefault);
const darkModeStore = useDarkModeStore();

watch(appearance, (newValue) => {
  if (newValue === 'system') {
    darkModeStore.reset();
  } else {
    darkModeStore.set(newValue === 'dark', true);
  }
});

const isDeleteModalActive = ref(false);

const deleteAccountForm = useForm({
  password: '',
});

const submitDelete = () => {
  console.log('hhhh');
  deleteAccountForm.delete(profile.destroy().url, {
    preserveScroll: true,
  });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CardBox is-form @submit.prevent="submitProfile">
          <NotificationBarInCard v-if="profileForm.hasErrors" color="danger">
            <b>Whoops! Something went wrong.</b>
          </NotificationBarInCard>

          <FormField label="Name" help="Required. Your name" :error="profileForm.errors.name">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="name"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail" :error="profileForm.errors.email">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <div v-if="mustVerifyEmail && !user.email_verified_at">
            <p class="text-muted-foreground text-sm">
              Your email address is unverified.
              <Link
                :href="send()"
                as="button"
                class="text-foreground hover:decoration-current! underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out dark:decoration-neutral-500"
              >
                Click here to resend the verification email.
              </Link>
            </p>

            <div
              v-if="status === 'verification-link-sent'"
              class="mt-2 text-sm font-medium text-green-600"
            >
              A new verification link has been sent to your email address.
            </div>
          </div>

          <template #footer>
            <BaseButtons>
              <BaseButton
                color="info"
                type="submit"
                label="Submit"
                :class="{ 'opacity-25': profileForm.processing }"
                :disabled="profileForm.processing"
              />
              <span v-show="profileForm.recentlySuccessful" class="animate-fade-in text-sm"
                >Saved!</span
              >
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPassword">
          <NotificationBarInCard v-if="passwordForm.hasErrors" color="danger">
            <b>Whoops! Something went wrong.</b>
          </NotificationBarInCard>

          <FormField
            label="Current password"
            help="Required. Your current password"
            :error="passwordForm.errors.current_password"
          >
            <FormControl
              v-model="passwordForm.current_password"
              :icon="mdiAsterisk"
              name="current_password"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Submit"
                :class="{ 'opacity-25': passwordForm.processing }"
                :disabled="passwordForm.processing"
              />
              <span v-show="passwordForm.recentlySuccessful" class="animate-fade-in text-sm"
                >Saved!</span
              >
            </BaseButtons>
          </template>
        </CardBox>
      </div>

      <CardBox class="mb-6">
        <FormField label="Dashboard theme">
          <FormCheckRadioGroup
            v-model="appearance"
            name="appearance"
            type="radio"
            :options="{ system: 'System', light: 'Light', dark: 'Dark' }"
          />
        </FormField>
      </CardBox>

      <CardBox class="mb-6">
        <BaseButton color="info" :href="twoFactor.show().url" label="Two-factor authentication" />
      </CardBox>

      <CardBoxModal
        v-model="isDeleteModalActive"
        title="Are you sure you want to delete your account?"
        has-cancel
        is-form
        has-custom-buttons
        @confirm="submitDelete"
      >
        <p>
          Once your account is deleted, all of its resources and data will also be permanently
          deleted. Please enter your password to confirm you would like to permanently delete your
          account.
        </p>

        <FormField
          label="Current password"
          help="Required. Your current password"
          :error="deleteAccountForm.errors.password"
        >
          <FormControl
            v-model="deleteAccountForm.password"
            :icon="mdiAsterisk"
            name="password"
            type="password"
            required
            autocomplete="current-password"
          />
        </FormField>

        <template #buttons>
          <BaseButtons>
            <BaseButton
              label="Delete account"
              color="danger"
              type="submit"
              :disabled="deleteAccountForm.processing"
              :class="{ 'opacity-25': deleteAccountForm.processing }"
            />
            <BaseButton
              label="Cancel"
              color="danger"
              outline
              @click="isDeleteModalActive = false"
            />
          </BaseButtons>
        </template>
      </CardBoxModal>

      <CardBox>
        <BaseButton label="Delete account" color="danger" @click="isDeleteModalActive = true" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
