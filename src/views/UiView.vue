<script setup>
import { ref, computed } from 'vue'
import { useStyleStore } from '@/stores/style.js'
import {
  mdiMonitorCellphone,
  mdiSelectColor,
  mdiFeather,
  mdiInformationOutline,
  mdiCheckCircleOutline,
  mdiAlertCircle,
  mdiAlertCircleOutline,
  mdiOpenInNew,
  mdiClose
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import FormField from '@/components/FormField.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

const titleStack = ref(['Admin', 'UI Components'])

const modalOneActive = ref(false)

const modalTwoActive = ref(false)

const modalThreeActive = ref(false)

const notificationSettingsModel = ref([])

const notificationsOutline = computed(() => notificationSettingsModel.value.indexOf('outline') > -1)

const buttonSettingsModel = ref([])

const buttonsOutline = computed(() => buttonSettingsModel.value.indexOf('outline') > -1)

const buttonsSmall = computed(() => buttonSettingsModel.value.indexOf('small') > -1)

const buttonsDisabled = computed(() => buttonSettingsModel.value.indexOf('disabled') > -1)

const styleStore = useStyleStore()
</script>

<template>
  <CardBoxModal
    v-model="modalOneActive"
    title="Please confirm action"
    button-label="Confirm"
    has-cancel
  >
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="modalTwoActive"
    large-title="Unhandled exception"
    button="danger"
    shake
  >
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="modalThreeActive"
    large-title="Success"
    button="success"
  >
    <p>This is sample modal</p>
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />

  <SectionHeroBar>UI Components</SectionHeroBar>

  <SectionTitle first>
    Dark mode
  </SectionTitle>

  <SectionMain>
    <CardBox class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
      <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
        <BaseButton
          label="Toggle"
          outline
          @click="styleStore.setDarkMode()"
        />
      </div>
    </CardBox>
  </SectionMain>

  <SectionTitle>
    Modal examples
  </SectionTitle>

  <SectionMain>
    <div class="space-y-12">
      <CardBox
        title="Confirm modal"
        :header-icon="mdiClose"
        class="cursor-pointer md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
        hoverable
        @click="modalOneActive = true"
      >
        <div class="space-y-3">
          <p>Click to see in action</p>
        </div>

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            label="Confirm"
            color="info"
          />
          <BaseButton
            label="Cancel"
            color="info"
            outline
          />
        </BaseButtons>
      </CardBox>

      <CardBox
        class="cursor-pointer md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
        hoverable
        @click="modalTwoActive = true"
      >
        <div class="space-y-3">
          <h1 class="text-2xl">
            Unhandled exception
          </h1>
          <p>Click to see in action</p>
        </div>

        <BaseDivider />

        <BaseButtons>
          <BaseButton
            label="Done"
            color="danger"
          />
        </BaseButtons>
      </CardBox>

      <CardBox
        class="cursor-pointer md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
        hoverable
        @click="modalThreeActive = true"
      >
        <div class="space-y-3">
          <h1 class="text-2xl">
            Success
          </h1>
          <p>Click to see in action</p>
        </div>

        <BaseDivider />

        <BaseButton
          label="Done"
          color="success"
        />
      </CardBox>
    </div>
  </SectionMain>

  <SectionTitle custom>
    <h1 class="text-2xl text-gray-500 dark:text-gray-400">
      Notifications
    </h1>
    <div class="flex items-center justify-center mt-6">
      <FormCheckRadioPicker
        v-model="notificationSettingsModel"
        type="switch"
        name="notifications-switch"
        :options="{ outline: 'Outline' }"
      />
    </div>
  </SectionTitle>

  <SectionMain>
    <NotificationBar
      color="info"
      :icon="mdiInformationOutline"
      :outline="notificationsOutline"
    >
      <b>Info state</b>. NotificationBar
      <template #right>
        <BaseButton
          :icon="mdiOpenInNew"
          label="Button"
          color="info"
          :outline="notificationsOutline"
          small
        />
      </template>
    </NotificationBar>

    <NotificationBar
      color="success"
      :icon="mdiCheckCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Success state</b>. NotificationBar
      <template #right>
        <BaseButton
          :icon="mdiOpenInNew"
          label="Button"
          color="success"
          :outline="notificationsOutline"
          small
        />
      </template>
    </NotificationBar>

    <NotificationBar
      color="warning"
      :icon="mdiAlertCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Warning state</b>. NotificationBar
      <template #right>
        <BaseButton
          :icon="mdiOpenInNew"
          label="Button"
          color="warning"
          :outline="notificationsOutline"
          small
        />
      </template>
    </NotificationBar>

    <NotificationBar
      color="danger"
      :icon="mdiAlertCircle"
      :outline="notificationsOutline"
    >
      <b>Danger state</b>. NotificationBar
      <template #right>
        <BaseButton
          :icon="mdiOpenInNew"
          label="Button"
          color="danger"
          :outline="notificationsOutline"
          small
        />
      </template>
    </NotificationBar>

    <NotificationBar
      color="white"
      :icon="mdiSelectColor"
      :outline="notificationsOutline"
    >
      <b>White</b>. NotificationBar
    </NotificationBar>

    <NotificationBar
      color="light"
      :icon="mdiFeather"
      :outline="notificationsOutline"
    >
      <b>Light</b>. NotificationBar
    </NotificationBar>
  </SectionMain>

  <SectionTitle>Buttons</SectionTitle>

  <SectionMain>
    <CardBox>
      <FormField label="Settings">
        <FormCheckRadioPicker
          v-model="buttonSettingsModel"
          name="buttons-switch"
          type="switch"
          :options="{ outline: 'Outline', small: 'Small', disabled: 'Disabled' }"
        />
      </FormField>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          color="white"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="light"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="info"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="success"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="warning"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="danger"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </BaseButtons>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          color="white"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="light"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="info"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="success"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="warning"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="danger"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </BaseButtons>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          color="white"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="light"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="info"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="success"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="warning"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <BaseButton
          color="danger"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </BaseButtons>
    </CardBox>
  </SectionMain>

  <SectionTitle>Cards</SectionTitle>

  <SectionMain>
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2 ">
      <CardBox
        title="With Title"
        mb=""
      >
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
          With title
        </div>
      </CardBox>

      <CardBox
        title="Title & Icons"
        :icon="mdiMonitorCellphone"
        :header-icon="mdiClose"
        mb=""
      >
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
          With title & icons
        </div>
      </CardBox>
    </div>

    <SectionTitleBarSub
      :icon="mdiAlertCircle"
      title="Empty variation"
    />

    <CardBox empty />
  </SectionMain>

  <SectionBottomOtherPages />
</template>
