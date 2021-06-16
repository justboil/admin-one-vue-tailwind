<template>
  <main-section>
    <card-component title="Login" :icon="mdiLock" class="w-11/12 md:w-5/12 shadow-2xl rounded-lg">
      <form method="get">

        <field label="Login" help="Please enter your login" spaced>
          <control :icon-left="mdiAccount">
            <input v-model="form.login" class="input" type="text" name="login" placeholder="user@example.com" autocomplete="username">
          </control>
        </field>

        <field label="Password" help="Please enter your password" spaced>
          <control :icon-left="mdiAsterisk">
            <input v-model="form.pass" class="input" type="password" name="password" placeholder="Password" autocomplete="current-password">
          </control>
        </field>

        <check-radio-picker name="remember" v-model="form.remember" :options="{ remember: 'Remember' }" spaced />

        <divider />

        <field grouped>
          <control>
            <button type="submit" class="button blue">
              Login
            </button>
          </control>
          <control>
            <router-link to="/" class="button">
              Back
            </router-link>
          </control>
        </field>
      </form>
    </card-component>
  </main-section>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccount, mdiAsterisk, mdiLock } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import Field from '@/components/Field'
import Control from '@/components/Control'
import Divider from '@/components/Divider.vue'

export default {
  name: 'Login',
  components: {
    MainSection,
    CardComponent,
    CheckRadioPicker,
    Field,
    Control,
    Divider
  },
  setup () {
    const store = useStore()

    store.dispatch('formScreenToggle', true)

    const form = reactive({
      login: '',
      pass: '',
      remember: ['remember']
    })

    return {
      form,
      mdiAccount,
      mdiAsterisk,
      mdiLock
    }
  },
  unmounted () {
    const store = useStore()

    store.dispatch('formScreenToggle', false)
  }
}
</script>
