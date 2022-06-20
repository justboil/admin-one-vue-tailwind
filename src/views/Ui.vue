<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/main'
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
import MainSection from '@/components/MainSection.vue'
import HeroBar from '@/components/HeroBar.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Notification from '@/components/Notification.vue'
import Divider from '@/components/Divider.vue'
import ModalBox from '@/components/ModalBox.vue'
import TitledSection from '@/components/TitledSection.vue'
import Field from '@/components/Field.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'

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

const mainStore = useMainStore()

const darkModeToggle = () => {
  mainStore.setDarkMode()
}
</script>

<template>
  <ModalBox
    v-model="modalOneActive"
    title="Please confirm action"
    button-label="Confirm"
    has-cancel
  >
    <p>This is sample modal</p>
  </ModalBox>

  <ModalBox
    v-model="modalTwoActive"
    large-title="Unhandled exception"
    button="danger"
    shake
  >
    <p>This is sample modal</p>
  </ModalBox>

  <ModalBox
    v-model="modalThreeActive"
    large-title="Success"
    button="success"
  >
    <p>This is sample modal</p>
  </ModalBox>

  <TitleBar :title-stack="titleStack" />

  <HeroBar>UI Components</HeroBar>

  <TitledSection first>
    Dark mode
  </TitledSection>

  <MainSection>
    <CardComponent class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
      <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
        <JbButton
          label="Toggle"
          outline
          @click="darkModeToggle"
        />
      </div>
    </CardComponent>
  </MainSection>

  <TitledSection>
    Modal examples
  </TitledSection>

  <MainSection>
    <div class="space-y-12">
      <CardComponent
        title="Confirm modal"
        :header-icon="mdiClose"
        class="cursor-pointer md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
        hoverable
        @click="modalOneActive = true"
      >
        <div class="space-y-3">
          <p>Click to see in action</p>
        </div>

        <Divider />

        <JbButtons>
          <JbButton
            label="Confirm"
            color="info"
          />
          <JbButton
            label="Cancel"
            color="info"
            outline
          />
        </JbButtons>
      </CardComponent>

      <CardComponent
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

        <Divider />

        <JbButtons>
          <JbButton
            label="Done"
            color="danger"
          />
        </JbButtons>
      </CardComponent>

      <CardComponent
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

        <Divider />

        <JbButton
          label="Done"
          color="success"
        />
      </CardComponent>
    </div>
  </MainSection>

  <TitledSection custom>
    <h1 class="text-2xl text-gray-500 dark:text-gray-400">
      Notifications
    </h1>
    <div class="flex items-center justify-center mt-6">
      <CheckRadioPicker
        v-model="notificationSettingsModel"
        type="switch"
        name="notifications-switch"
        :options="{ outline: 'Outline' }"
      />
    </div>
  </TitledSection>

  <MainSection>
    <Notification
      color="info"
      :icon="mdiInformationOutline"
      :outline="notificationsOutline"
    >
      <b>Info state</b>. Notification
      <template #right>
        <JbButton
          :icon="mdiOpenInNew"
          label="Button"
          color="info"
          :outline="notificationsOutline"
          small
        />
      </template>
    </Notification>

    <Notification
      color="success"
      :icon="mdiCheckCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Success state</b>. Notification
      <template #right>
        <JbButton
          :icon="mdiOpenInNew"
          label="Button"
          color="success"
          :outline="notificationsOutline"
          small
        />
      </template>
    </Notification>

    <Notification
      color="warning"
      :icon="mdiAlertCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Warning state</b>. Notification
      <template #right>
        <JbButton
          :icon="mdiOpenInNew"
          label="Button"
          color="warning"
          :outline="notificationsOutline"
          small
        />
      </template>
    </Notification>

    <Notification
      color="danger"
      :icon="mdiAlertCircle"
      :outline="notificationsOutline"
    >
      <b>Danger state</b>. Notification
      <template #right>
        <JbButton
          :icon="mdiOpenInNew"
          label="Button"
          color="danger"
          :outline="notificationsOutline"
          small
        />
      </template>
    </Notification>

    <Notification
      color="white"
      :icon="mdiSelectColor"
      :outline="notificationsOutline"
    >
      <b>White</b>. Notification
    </Notification>

    <Notification
      color="light"
      :icon="mdiFeather"
      :outline="notificationsOutline"
    >
      <b>Light</b>. Notification
    </Notification>
  </MainSection>

  <TitledSection>Buttons</TitledSection>

  <MainSection>
    <CardComponent>
      <Field label="Settings">
        <CheckRadioPicker
          v-model="buttonSettingsModel"
          name="buttons-switch"
          type="switch"
          :options="{ outline: 'Outline', small: 'Small', disabled: 'Disabled' }"
        />
      </Field>

      <Divider />

      <JbButtons>
        <JbButton
          color="white"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="light"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="info"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="success"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="warning"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="danger"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </JbButtons>

      <Divider />

      <JbButtons>
        <JbButton
          color="white"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="light"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="info"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="success"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="warning"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="danger"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </JbButtons>

      <Divider />

      <JbButtons>
        <JbButton
          color="white"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="light"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="info"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="success"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="warning"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <JbButton
          color="danger"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </JbButtons>
    </CardComponent>
  </MainSection>

  <TitledSection>Cards</TitledSection>

  <MainSection>
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2 ">
      <CardComponent
        title="With Title"
        mb=""
      >
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
          With title
        </div>
      </CardComponent>

      <CardComponent
        title="Title & Icons"
        :icon="mdiMonitorCellphone"
        :header-icon="mdiClose"
        mb=""
      >
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
          With title & icons
        </div>
      </CardComponent>
    </div>

    <TitleSubBar
      :icon="mdiAlertCircle"
      title="Empty variation"
    />

    <CardComponent empty />
  </MainSection>

  <BottomOtherPagesSection />
</template>
