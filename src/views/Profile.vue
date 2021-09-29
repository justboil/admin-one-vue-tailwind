<template>
  <title-bar :title-stack="titleStack" />

  <user-card />

  <main-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <card-component
        title="Edit Profile"
        :icon="mdiAccountCircle"
        @submit.prevent="submitProfile"
        form
      >
        <field label="Avatar" help="Max 500kb">
          <file-picker />
        </field>

        <field label="Name" help="Required. Your name">
          <control :icon="mdiAccount" v-model="profileForm.name" name="username" required autocomplete="username"/>
        </field>
        <field label="E-mail" help="Required. Your e-mail">
          <control :icon="mdiMail" type="email" name="email" v-model="profileForm.email" required autocomplete="email"/>
        </field>

        <divider/>

        <jb-buttons>
          <jb-button color="info" type="submit" label="Submit" />
          <jb-button color="info" label="Options" outline />
        </jb-buttons>
      </card-component>

      <card-component
        title="Change Password"
        :icon="mdiLock"
        @submit.prevent="submitPass"
        form
      >
        <field label="Current password" help="Required. Your current password">
          <control
            :icon="mdiAsterisk"
            v-model="passwordForm.password_current"
            name="password_current"
            type="password"
            required
            autocomplete="current-password"
          />
        </field>

        <divider/>

        <field label="New password" help="Required. New password">
          <control
            :icon="mdiFormTextboxPassword"
            v-model="passwordForm.password"
            name="password"
            type="password"
            required
            autocomplete="new-password"
          />
        </field>

        <field label="Confirm password" help="Required. New password one more time">
          <control
            :icon="mdiFormTextboxPassword"
            v-model="passwordForm.password_confirmation"
            name="password_confirmation"
            type="password"
            required
            autocomplete="new-password"
          />
        </field>

        <divider/>

        <jb-buttons>
          <jb-button type="submit" color="info" label="Submit" />
          <jb-button color="info" label="Options" outline />
        </jb-buttons>

      </card-component>
    </div>
  </main-section>

  <bottom-other-pages-section />
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import Divider from '@/components/Divider'
import Field from '@/components/Field'
import Control from '@/components/Control'
import FilePicker from '@/components/FilePicker'
import JbButton from '@/components/JbButton'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection'
import JbButtons from '@/components/JbButtons'
import UserCard from '@/components/UserCard'

export default {
  name: 'Profile',
  components: {
    UserCard,
    JbButtons,
    MainSection,
    TitleBar,
    CardComponent,
    Divider,
    Field,
    Control,
    FilePicker,
    JbButton,
    BottomOtherPagesSection
  },
  setup () {
    const store = useStore()

    const titleStack = ref(['Admin', 'Profile'])

    const profileForm = reactive({
      name: store.state.userName,
      email: store.state.userEmail
    })

    const passwordForm = reactive({
      password_current: '',
      password: '',
      password_confirmation: ''
    })

    const submitProfile = () => {
      store.commit('user', profileForm)
    }

    const submitPass = () => {
      //
    }

    return {
      titleStack,
      profileForm,
      passwordForm,
      submitProfile,
      submitPass,
      mdiAccount,
      mdiAccountCircle,
      mdiLock,
      mdiMail,
      mdiAsterisk,
      mdiFormTextboxPassword
    }
  }
}
</script>
