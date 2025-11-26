<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import CardBox from '@/components/CardBox.vue';
import CardBoxMessage from '@/components/CardBoxMessage.vue';
import PillTag from '@/components/PillTag.vue';
import SectionMain from '@/components/SectionMain.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import profile from '@/routes/profile';
import { disable, enable } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { mdiAccount, mdiTwoFactorAuthentication } from '@mdi/js';
import { onUnmounted, ref } from 'vue';

interface Props {
  requiresConfirmation?: boolean;
  twoFactorEnabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  requiresConfirmation: false,
  twoFactorEnabled: false,
});

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const showSetupModal = ref<boolean>(false);

onUnmounted(() => {
  clearTwoFactorAuthData();
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTwoFactorAuthentication"
        title="Two-factor authentication"
        main
      >
        <BaseButton
          :href="profile.edit().url"
          :icon="mdiAccount"
          label="Back to profile"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox v-if="!twoFactorEnabled">
        <CardBoxMessage>
          When you enable two-factor authentication, you will be prompted for a secure pin during
          login. This pin can be retrieved from a TOTP-supported application on your phone.
        </CardBoxMessage>

        <div class="flex items-center gap-3">
          <BaseButton
            v-if="hasSetupData"
            @click="showSetupModal = true"
            label="Continue setup"
            color="info"
            outline
            small
          />
          <Form
            v-else
            v-bind="enable.form()"
            @success="showSetupModal = true"
            #default="{ processing }"
          >
            <BaseButton
              type="submit"
              :disabled="processing"
              label="Enable 2FA"
              color="info"
              outline
              small
            />
          </Form>
          <PillTag color="danger" label="Disabled" />
        </div>
      </CardBox>

      <template v-else>
        <CardBox class="mb-6">
          <CardBoxMessage>
            With two-factor authentication enabled, you will be prompted for a secure, random pin
            during login, which you can retrieve from the TOTP-supported application on your phone.
          </CardBoxMessage>

          <div class="flex items-center gap-3">
            <Form v-bind="disable.form()" #default="{ processing }">
              <BaseButton
                variant="destructive"
                type="submit"
                :disabled="processing"
                color="danger"
                label="Disable 2FA"
                outline
                small
              />
            </Form>
          </div>
        </CardBox>

        <TwoFactorRecoveryCodes />
      </template>

      <TwoFactorSetupModal
        v-model:isOpen="showSetupModal"
        :requiresConfirmation="requiresConfirmation"
        :twoFactorEnabled="twoFactorEnabled"
      />
    </SectionMain>
  </LayoutAuthenticated>
</template>
