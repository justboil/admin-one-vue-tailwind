<script setup>
import { ref, computed } from 'vue'
import { useDarkModeStore } from '@/stores/darkMode.js'
import {
  mdiContrastCircle,
  mdiInformation,
  mdiCheckCircle,
  mdiAlert,
  mdiAlertCircle,
  mdiOpenInNew,
  mdiClose,
  mdiReload,
  mdiTrendingUp,
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import PillTag from '@/components/PillTag.vue'

const modalOneActive = ref(false)

const modalTwoActive = ref(false)

const modalThreeActive = ref(false)

const notificationSettingsModel = ref([])

const notificationsOutline = computed(() => notificationSettingsModel.value.indexOf('outline') > -1)

const buttonSettingsModel = ref([])

const buttonsOutline = computed(() => buttonSettingsModel.value.indexOf('outline') > -1)

const buttonsSmall = computed(() => buttonSettingsModel.value.indexOf('small') > -1)

const buttonsDisabled = computed(() => buttonSettingsModel.value.indexOf('disabled') > -1)

const buttonsRounded = computed(() => buttonSettingsModel.value.indexOf('rounded') > -1)

const pillsSettingsModel = ref(['icon'])

const pillsOutline = computed(() => pillsSettingsModel.value.indexOf('outline') > -1)

const pillsSmall = computed(() => pillsSettingsModel.value.indexOf('small') > -1)

const pillsIcon = computed(() =>
  pillsSettingsModel.value.indexOf('icon') > -1 ? mdiTrendingUp : null,
)

const darkModeStore = useDarkModeStore()
</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal
      v-model="modalOneActive"
      title="Please confirm action"
      button-label="Confirm"
      has-cancel
    >
      <p>This is sample modal</p>
      <p>Lorem ipsum dolor</p>
    </CardBoxModal>

    <CardBoxModal v-model="modalTwoActive" title="Unhandled exception" button="danger">
      <p>This is sample modal</p>
      <p>Lorem ipsum dolor</p>
    </CardBoxModal>

    <CardBoxModal v-model="modalThreeActive" title="Success" button="success">
      <p>This is sample modal</p>
      <p>Lorem ipsum dolor</p>
    </CardBoxModal>

    <SectionTitle first>Dark mode</SectionTitle>

    <SectionMain>
      <CardBox class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-slate-400">
          <BaseButton label="Toggle" color="contrast" @click="darkModeStore.set()" />
        </div>
      </CardBox>
    </SectionMain>

    <SectionTitle>Modal examples</SectionTitle>

    <SectionMain>
      <div class="space-y-12">
        <CardBox
          class="cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto"
          is-hoverable
          @click="modalOneActive = true"
        >
          <CardBoxComponentTitle title="Please confirm action">
            <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full />
          </CardBoxComponentTitle>
          <div class="space-y-3">
            <p>Click to see in action</p>
          </div>

          <template #footer>
            <BaseButtons>
              <BaseButton label="Confirm" color="info" />
              <BaseButton label="Cancel" color="info" outline />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox
          class="cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto"
          is-hoverable
          @click="modalTwoActive = true"
        >
          <CardBoxComponentTitle title="Unhandled exception" />

          <div class="space-y-3">
            <p>Click to see in action</p>
          </div>

          <template #footer>
            <BaseButtons>
              <BaseButton label="Done" color="danger" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox
          class="cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto"
          is-hoverable
          @click="modalThreeActive = true"
        >
          <CardBoxComponentTitle title="Success" />

          <div class="space-y-3">
            <p>Click to see in action</p>
          </div>

          <template #footer>
            <BaseButton label="Done" color="success" />
          </template>
        </CardBox>
      </div>
    </SectionMain>

    <SectionTitle custom>
      <h1 class="text-2xl text-gray-500 dark:text-slate-400">Notifications</h1>
      <div class="flex items-center justify-center mt-6">
        <FormCheckRadioGroup
          v-model="notificationSettingsModel"
          type="switch"
          name="notifications-switch"
          :options="{ outline: 'Outline' }"
        />
      </div>
    </SectionTitle>

    <SectionMain>
      <NotificationBar color="info" :icon="mdiInformation" :outline="notificationsOutline">
        <b>Info state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'info' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="success" :icon="mdiCheckCircle" :outline="notificationsOutline">
        <b>Success state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'success' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="warning" :icon="mdiAlert" :outline="notificationsOutline">
        <b>Warning state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'warning' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="danger" :icon="mdiAlertCircle" :outline="notificationsOutline">
        <b>Danger state</b>. NotificationBar
        <template #right>
          <BaseButton
            label="Button"
            :color="notificationsOutline ? 'danger' : 'white'"
            :outline="notificationsOutline"
            rounded-full
            small
          />
        </template>
      </NotificationBar>

      <NotificationBar color="contrast" :icon="mdiContrastCircle" :outline="notificationsOutline">
        <b>Contrast</b>. NotificationBar
      </NotificationBar>
    </SectionMain>

    <SectionTitle>Buttons</SectionTitle>

    <SectionMain>
      <CardBox>
        <FormField label="Settings">
          <FormCheckRadioGroup
            v-model="buttonSettingsModel"
            name="buttons-switch"
            type="switch"
            :options="{
              outline: 'Outline',
              small: 'Small',
              rounded: 'Rounded',
              disabled: 'Disabled',
            }"
          />
        </FormField>

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            color="lightDark"
            label="Button"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="contrast"
            label="Button"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="info"
            label="Button"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="success"
            label="Button"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="warning"
            label="Button"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="danger"
            label="Button"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
        </BaseButtons>

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            color="lightDark"
            label="Button"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="contrast"
            label="Button"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="info"
            label="Button"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="success"
            label="Button"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="warning"
            label="Button"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="danger"
            label="Button"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
        </BaseButtons>

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            color="lightDark"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="contrast"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="info"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="success"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="warning"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
          <BaseButton
            color="danger"
            :icon="mdiOpenInNew"
            :small="buttonsSmall"
            :outline="buttonsOutline"
            :disabled="buttonsDisabled"
            :rounded-full="buttonsRounded"
          />
        </BaseButtons>
      </CardBox>
    </SectionMain>

    <SectionTitle>Pills</SectionTitle>

    <SectionMain>
      <CardBox>
        <FormField label="Settings">
          <FormCheckRadioGroup
            v-model="pillsSettingsModel"
            name="buttons-switch"
            type="switch"
            :options="{ outline: 'Outline', small: 'Small', icon: 'Icon' }"
          />
        </FormField>

        <BaseDivider />

        <BaseButtons>
          <PillTag
            color="contrast"
            label="Contrast"
            :small="pillsSmall"
            :outline="pillsOutline"
            :icon="pillsIcon"
          />
          <PillTag
            color="info"
            label="Info"
            :small="pillsSmall"
            :outline="pillsOutline"
            :icon="pillsIcon"
          />
          <PillTag
            color="success"
            label="Success"
            :small="pillsSmall"
            :outline="pillsOutline"
            :icon="pillsIcon"
          />
          <PillTag
            color="warning"
            label="Warning"
            :small="pillsSmall"
            :outline="pillsOutline"
            :icon="pillsIcon"
          />
          <PillTag
            color="danger"
            label="Danger"
            :small="pillsSmall"
            :outline="pillsOutline"
            :icon="pillsIcon"
          />
        </BaseButtons>
      </CardBox>
    </SectionMain>

    <SectionTitle>Cards</SectionTitle>

    <SectionMain>
      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <CardBox>
          <CardBoxComponentTitle title="With title & icon">
            <BaseButton :icon="mdiReload" color="whiteDark" rounded-full />
          </CardBoxComponentTitle>
          <div class="space-y-3">
            <p>Card with title, icon & footer</p>
          </div>

          <template #footer>
            <BaseButtons>
              <BaseButton label="Confirm" color="info" />
              <BaseButton label="Cancel" color="info" outline />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox>
          Just body & footer

          <template #footer>
            <BaseButtons>
              <BaseButton label="Confirm" color="info" />
              <BaseButton label="Cancel" color="info" outline />
            </BaseButtons>
          </template>
        </CardBox>
      </div>

      <SectionTitleLineWithButton :icon="mdiAlertCircle" title="Empty variation" />

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
