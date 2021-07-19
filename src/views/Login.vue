<template>
  <main-section>
    <card-component  class="w-11/12 md:w-5/12 shadow-2xl rounded-lg" @submit.prevent="submit" form>

      <field label="Login" help="Please enter your login">
        <control v-model="form.login" :icon="mdiAccount" name="login" autocomplete="username"/>
      </field>

      <field label="Password" help="Please enter your password">
        <control v-model="form.pass" :icon="mdiAsterisk" type="password" name="password" autocomplete="current-password"/>
      </field>

      <check-radio-picker name="remember" v-model="form.remember" :options="{ remember: 'Remember' }" />

      <divider />

      <jb-buttons>
        <jb-button type="submit" color="info" label="Login" />
        <jb-button to="/" color="info" outline label="Back" />
      </jb-buttons>
    </card-component>
  </main-section>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'

export default {
  name: 'Login',
  components: {
    MainSection,
    CardComponent,
    CheckRadioPicker,
    Field,
    Control,
    Divider,
    JbButton,
    JbButtons
  },
  setup () {
    const form = reactive({
      login: 'john.doe',
      pass: 'very-secret-password-fYjUw-',
      remember: ['remember']
    })

    const router = useRouter()

    const submit = () => {
      router.push('/')
    }

    return {
      form,
      submit,
      mdiAccount,
      mdiAsterisk
    }
  }
}
</script>
