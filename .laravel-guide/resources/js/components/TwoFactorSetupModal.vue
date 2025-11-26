<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import CardBoxComponentFooter from '@/components/CardBoxComponentFooter.vue';
import CardBoxMessage from '@/components/CardBoxMessage.vue';
import CardBoxModal from '@/components/CardBoxModal.vue';
import CardBoxModalBody from '@/components/CardBoxModalBody.vue';
import FormControl from '@/components/FormControl.vue';
import FormField from '@/components/FormField.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { useClipboard } from '@vueuse/core';
import { Check, Copy, Loader2 } from 'lucide-vue-next';
import { computed, nextTick, ref, watch } from 'vue';
import NotificationErrors from './NotificationErrors.vue';

interface Props {
  requiresConfirmation: boolean;
  twoFactorEnabled: boolean;
}

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('isOpen');

const { copy, copied } = useClipboard();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } = useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<string>('');

const pinInputContainerRef = ref<HTMLElement | null>(null);

const modalConfig = computed<{
  title: string;
  description: string;
  buttonText: string;
}>(() => {
  if (props.twoFactorEnabled) {
    return {
      title: 'Two-Factor Authentication Enabled',
      description:
        'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
      buttonText: 'Close',
    };
  }

  if (showVerificationStep.value) {
    return {
      title: 'Verify Authentication Code',
      description: 'Enter the 6-digit code from your authenticator app',
      buttonText: 'Continue',
    };
  }

  return {
    title: 'Enable Two-Factor Authentication',
    description:
      'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
    buttonText: 'Continue',
  };
});

const handleModalNextStep = () => {
  if (props.requiresConfirmation) {
    showVerificationStep.value = true;

    nextTick(() => {
      pinInputContainerRef.value?.querySelector('input')?.focus();
    });

    return;
  }

  clearSetupData();
  isOpen.value = false;
};

const resetModalState = () => {
  if (props.twoFactorEnabled) {
    clearSetupData();
  }

  showVerificationStep.value = false;
  code.value = [];
};

watch(
  () => isOpen.value,
  async (isOpen) => {
    if (!isOpen) {
      resetModalState();
      return;
    }

    if (!qrCodeSvg.value) {
      await fetchSetupData();
    }
  },
);
</script>

<template>
  <CardBoxModal v-model="isOpen" :title="modalConfig.title" has-cancel has-custom-layout>
    <template v-if="!showVerificationStep">
      <CardBoxModalBody>
        <CardBoxMessage>
          {{ modalConfig.description }}
        </CardBoxMessage>

        <div class="relative flex w-auto flex-col space-y-3">
          <NotificationErrors v-if="errors?.length" :errors="errors" />
          <template v-else>
            <div class="relative mx-auto flex max-w-md items-center overflow-hidden">
              <div
                class="border-border relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border"
              >
                <div
                  v-if="!qrCodeSvg"
                  class="bg-background absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center"
                >
                  <Loader2 class="size-6 animate-spin" />
                </div>
                <div v-else class="relative z-10 overflow-hidden border p-5">
                  <div
                    v-html="qrCodeSvg"
                    class="flex aspect-square size-full items-center justify-center"
                  />
                </div>
              </div>
            </div>

            <CardBoxMessage>&hellip;or, enter the code manually</CardBoxMessage>

            <div class="flex w-full items-center justify-center space-x-2">
              <div
                class="border-border flex w-full items-stretch overflow-hidden rounded-xl border"
              >
                <div
                  v-if="!manualSetupKey"
                  class="bg-muted flex h-full w-full items-center justify-center p-3"
                >
                  <Loader2 class="size-4 animate-spin" />
                </div>
                <template v-else>
                  <div class="bg-background text-foreground h-full w-full p-3">
                    {{ manualSetupKey }}
                  </div>
                  <button
                    @click="copy(manualSetupKey || '')"
                    class="border-border hover:bg-muted relative block h-auto border-l px-3"
                  >
                    <Check v-if="copied" class="w-4 text-green-500" />
                    <Copy v-else class="w-4" />
                  </button>
                </template>
              </div>
            </div>
          </template>
        </div>
      </CardBoxModalBody>
      <CardBoxComponentFooter>
        <BaseButton color="info" :label="modalConfig.buttonText" @click="handleModalNextStep" />
      </CardBoxComponentFooter>
    </template>
    <template v-else>
      <Form
        v-bind="confirm.form()"
        reset-on-error
        @finish="code = ''"
        @success="isOpen = false"
        v-slot="{ errors, processing }"
      >
        <CardBoxModalBody>
          <CardBoxMessage>
            {{ modalConfig.description }}
          </CardBoxMessage>

          <div ref="pinInputContainerRef">
            <FormField
              label="OTP code"
              help="Required. Code from authenticator app"
              :error="errors?.confirmTwoFactorAuthentication?.code"
            >
              <FormControl v-model="code" name="code" type="number" required />
            </FormField>
          </div>
        </CardBoxModalBody>
        <CardBoxComponentFooter>
          <BaseButtons>
            <BaseButton
              label="Confirm"
              type="submit"
              color="info"
              :disabled="processing || (code + '').length < 6"
            />
            <BaseButton
              label="Back"
              color="info"
              outline
              @click="showVerificationStep = false"
              :disabled="processing"
            />
          </BaseButtons>
        </CardBoxComponentFooter>
      </Form>
    </template>
  </CardBoxModal>
</template>
