<script setup lang="ts">
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { mdiEyeOffOutline, mdiEyeOutline, mdiLockOutline, mdiReload } from '@mdi/js';
import { nextTick, onMounted, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import CardBox from './CardBox.vue';
import CardBoxComponentBody from './CardBoxComponentBody.vue';
import CardBoxComponentHeader from './CardBoxComponentHeader.vue';
import CardBoxMessage from './CardBoxMessage.vue';
import NotificationErrors from './NotificationErrors.vue';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref<boolean>(false);
const recoveryCodeSectionRef = ref<HTMLDivElement | null>(null);

const toggleRecoveryCodesVisibility = async () => {
  if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
    await fetchRecoveryCodes();
  }

  isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

  if (isRecoveryCodesVisible.value) {
    await nextTick();
    recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(async () => {
  if (!recoveryCodesList.value.length) {
    await fetchRecoveryCodes();
  }
});
</script>

<template>
  <CardBox has-component-layout>
    <CardBoxComponentHeader title="Recovery codes" :icon="mdiLockOutline" />

    <CardBoxComponentBody>
      <CardBoxMessage>
        Recovery codes let you regain access if you lose your 2FA device. Store them in a secure
        password manager.
      </CardBoxMessage>

      <div class="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between">
        <BaseButton
          @click="toggleRecoveryCodesVisibility"
          color="info"
          small
          :label="isRecoveryCodesVisible ? 'Hide Recovery codes' : 'View Recovery Codes'"
          :icon="isRecoveryCodesVisible ? mdiEyeOffOutline : mdiEyeOutline"
        />

        <Form
          v-if="isRecoveryCodesVisible && recoveryCodesList.length"
          v-bind="regenerateRecoveryCodes.form()"
          method="post"
          :options="{ preserveScroll: true }"
          @success="fetchRecoveryCodes"
          #default="{ processing }"
        >
          <BaseButton
            type="submit"
            color="info"
            label="Regenerate codes"
            :icon="mdiReload"
            outline
            small
          />
        </Form>
      </div>
      <div
        :class="[
          'relative overflow-hidden transition-all duration-300',
          isRecoveryCodesVisible ? 'h-auto opacity-100' : 'h-0 opacity-0',
        ]"
      >
        <div v-if="errors?.length" class="mt-6">
          <NotificationErrors :errors="errors" />
        </div>
        <div v-else class="mt-6 space-y-3">
          <div
            ref="recoveryCodeSectionRef"
            class="bg-muted grid gap-1 rounded-lg font-mono text-sm"
          >
            <div v-if="!recoveryCodesList.length" class="space-y-2">
              <div
                v-for="n in 8"
                :key="n"
                class="bg-muted-foreground/20 h-4 animate-pulse rounded"
              ></div>
            </div>
            <div v-else v-for="(code, index) in recoveryCodesList" :key="index">
              {{ code }}
            </div>
          </div>
          <CardBoxMessage is-small>
            Each recovery code can be used once to access your account and will be removed after
            use. If you need more, click
            <span class="font-bold">Regenerate Codes</span> above.
          </CardBoxMessage>
        </div>
      </div>
    </CardBoxComponentBody>
  </CardBox>
</template>
