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
  <modal-box
    v-model="modalOneActive"
    title="Please confirm action"
    button-label="Confirm"
    has-cancel
  >
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="modalTwoActive"
    large-title="Unhandled exception"
    button="danger"
    shake
  >
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="modalThreeActive"
    large-title="Success"
    button="success"
  >
    <p>This is sample modal</p>
  </modal-box>

  <title-bar :title-stack="titleStack" />

  <hero-bar>UI Components</hero-bar>

  <titled-section first>
    Dark mode
  </titled-section>

  <main-section>
    <card-component class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
      <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
        <jb-button
          label="Toggle"
          outline
          @click="darkModeToggle"
        />
      </div>
    </card-component>
  </main-section>

  <titled-section>
    Modal examples
  </titled-section>

  <main-section>
    <div class="space-y-12">
      <card-component
        title="Confirm modal"
        :header-icon="mdiClose"
        class="cursor-pointer md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
        hoverable
        @click="modalOneActive = true"
      >
        <div class="space-y-3">
          <p>Click to see in action</p>
        </div>

        <divider />

        <jb-buttons>
          <jb-button
            label="Confirm"
            color="info"
          />
          <jb-button
            label="Cancel"
            color="info"
            outline
          />
        </jb-buttons>
      </card-component>

      <card-component
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

        <divider />

        <jb-buttons>
          <jb-button
            label="Done"
            color="danger"
          />
        </jb-buttons>
      </card-component>

      <card-component
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

        <divider />

        <jb-button
          label="Done"
          color="success"
        />
      </card-component>
    </div>
  </main-section>

  <titled-section custom>
    <h1 class="text-2xl text-gray-500 dark:text-gray-400">
      Notifications
    </h1>
    <div class="flex items-center justify-center mt-6">
      <check-radio-picker
        v-model="notificationSettingsModel"
        type="switch"
        name="notifications-switch"
        :options="{ outline: 'Outline' }"
      />
    </div>
  </titled-section>

  <main-section>
    <notification
      color="info"
      :icon="mdiInformationOutline"
      :outline="notificationsOutline"
    >
      <b>Info state</b>. Notification
      <template #right>
        <jb-button
          :icon="mdiOpenInNew"
          label="Button"
          color="info"
          :outline="notificationsOutline"
          small
        />
      </template>
    </notification>

    <notification
      color="success"
      :icon="mdiCheckCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Success state</b>. Notification
      <template #right>
        <jb-button
          :icon="mdiOpenInNew"
          label="Button"
          color="success"
          :outline="notificationsOutline"
          small
        />
      </template>
    </notification>

    <notification
      color="warning"
      :icon="mdiAlertCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Warning state</b>. Notification
      <template #right>
        <jb-button
          :icon="mdiOpenInNew"
          label="Button"
          color="warning"
          :outline="notificationsOutline"
          small
        />
      </template>
    </notification>

    <notification
      color="danger"
      :icon="mdiAlertCircle"
      :outline="notificationsOutline"
    >
      <b>Danger state</b>. Notification
      <template #right>
        <jb-button
          :icon="mdiOpenInNew"
          label="Button"
          color="danger"
          :outline="notificationsOutline"
          small
        />
      </template>
    </notification>

    <notification
      color="white"
      :icon="mdiSelectColor"
      :outline="notificationsOutline"
    >
      <b>White</b>. Notification
    </notification>

    <notification
      color="light"
      :icon="mdiFeather"
      :outline="notificationsOutline"
    >
      <b>Light</b>. Notification
    </notification>
  </main-section>

  <titled-section>Buttons</titled-section>

  <main-section>
    <card-component>
      <field label="Settings">
        <check-radio-picker
          v-model="buttonSettingsModel"
          name="buttons-switch"
          type="switch"
          :options="{ outline: 'Outline', small: 'Small', disabled: 'Disabled' }"
        />
      </field>

      <divider />

      <jb-buttons>
        <jb-button
          color="white"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="light"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="info"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="success"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="warning"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="danger"
          label="Button"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </jb-buttons>

      <divider />

      <jb-buttons>
        <jb-button
          color="white"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="light"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="info"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="success"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="warning"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="danger"
          label="Button"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </jb-buttons>

      <divider />

      <jb-buttons>
        <jb-button
          color="white"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="light"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="info"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="success"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="warning"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
        <jb-button
          color="danger"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
        />
      </jb-buttons>
    </card-component>
  </main-section>

  <titled-section>Cards</titled-section>

  <main-section>
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2 ">
      <card-component
        title="With Title"
        mb=""
      >
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
          With title
        </div>
      </card-component>

      <card-component
        title="Title & Icons"
        :icon="mdiMonitorCellphone"
        :header-icon="mdiClose"
        mb=""
      >
        <div class="text-center py-24 lg:py-12 text-gray-500 dark:text-gray-400">
          With title & icons
        </div>
      </card-component>
    </div>

    <title-sub-bar
      :icon="mdiAlertCircle"
      title="Empty variation"
    />

    <card-component empty />
  </main-section>

  <bottom-other-pages-section />
</template>
