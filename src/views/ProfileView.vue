<script setup>
import { ref, reactive } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import Divider from '@/components/Divider.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import FilePicker from '@/components/FilePicker.vue'
import JbButton from '@/components/JbButton.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import JbButtons from '@/components/JbButtons.vue'
import UserCard from '@/components/UserCard.vue'

const mainStore = useMainStore()

const titleStack = ref(['Admin', 'Profile'])

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: ''
})

const submitProfile = () => {
  mainStore.setUser(profileForm)
}

const submitPass = () => {
  //
}
</script>

<template>
  <TitleBar :title-stack="titleStack" />

  <UserCard />

  <MainSection>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CardComponent
        title="Edit Profile"
        :icon="mdiAccountCircle"
        form
        @submit.prevent="submitProfile"
      >
        <Field
          label="Avatar"
          help="Max 500kb"
        >
          <FilePicker />
        </Field>

        <Field
          label="Name"
          help="Required. Your name"
        >
          <Control
            v-model="profileForm.name"
            :icon="mdiAccount"
            name="username"
            required
            autocomplete="username"
          />
        </Field>
        <Field
          label="E-mail"
          help="Required. Your e-mail"
        >
          <Control
            v-model="profileForm.email"
            :icon="mdiMail"
            type="email"
            name="email"
            required
            autocomplete="email"
          />
        </Field>

        <Divider />

        <JbButtons>
          <JbButton
            color="info"
            type="submit"
            label="Submit"
          />
          <JbButton
            color="info"
            label="Options"
            outline
          />
        </JbButtons>
      </CardComponent>

      <CardComponent
        title="Change Password"
        :icon="mdiLock"
        form
        @submit.prevent="submitPass"
      >
        <Field
          label="Current password"
          help="Required. Your current password"
        >
          <Control
            v-model="passwordForm.password_current"
            :icon="mdiAsterisk"
            name="password_current"
            type="password"
            required
            autocomplete="current-password"
          />
        </Field>

        <Divider />

        <Field
          label="New password"
          help="Required. New password"
        >
          <Control
            v-model="passwordForm.password"
            :icon="mdiFormTextboxPassword"
            name="password"
            type="password"
            required
            autocomplete="new-password"
          />
        </Field>

        <Field
          label="Confirm password"
          help="Required. New password one more time"
        >
          <Control
            v-model="passwordForm.password_confirmation"
            :icon="mdiFormTextboxPassword"
            name="password_confirmation"
            type="password"
            required
            autocomplete="new-password"
          />
        </Field>

        <Divider />

        <JbButtons>
          <JbButton
            type="submit"
            color="info"
            label="Submit"
          />
          <JbButton
            color="info"
            label="Options"
            outline
          />
        </JbButtons>
      </CardComponent>
    </div>
  </MainSection>

  <BottomOtherPagesSection />
</template>
