<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    Profile
    <template #right>
      <router-link to="/" class="button light">
        Dashboard
      </router-link>
    </template>
  </hero-bar>
  <main-section>
    <tiles>
      <card-component title="Edit Profile" icon="account-circle" class="tile is-child">
        <form @submit.prevent="submit">
          <file-picker label="Avatar" />
          <divider/>
          <field label="Name" help="Required. Your name">
            <control>
              <input v-model="userName" name="name" class="input" required />
            </control>
          </field>
          <field label="E-mail" help="Required. Your e-mail">
            <control>
              <input v-model="userEmail" name="email" type="email" class="input" required />
            </control>
          </field>
          <divider/>
          <field>
            <control>
              <button type="submit" class="button blue">
                Submit
              </button>
            </control>
          </field>
        </form>
      </card-component>
      <card-component title="Profile" icon="account" class="tile is-child">
        <user-avatar class="w-48 h-48 mx-auto" />
        <divider/>
        <field label="Name">
          <control>
            <input class="input" :value="userName" readonly />
          </control>
        </field>
        <divider/>
        <field label="E-mail">
          <input :value="userEmail" class="input" readonly />
        </field>
      </card-component>
    </tiles>
    <card-component title="Change Password" icon="lock">
      <form @submit.prevent="submit">
        <field label="Current password" help="Required. Your current password">
          <control>
            <input
              v-model="passwordForm.password_current"
              name="password_current"
              type="password"
              required
              autcomplete="current-password"
              class="input"
            />
          </control>
        </field>

        <divider/>

        <field label="New password" help="Required. New password">
          <control>
            <input
              v-model="passwordForm.password"
              name="password"
              type="password"
              required
              autocomplete="new-password"
              class="input"
            />
          </control>
        </field>

        <field label="Confirm password" help="Required. New password one more time">
          <control>
            <input
              v-model="passwordForm.password_confirmation"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
              class="input"
            />
          </control>
        </field>

        <divider/>

        <field>
          <control>
            <button type="submit" class="button green">
              Submit
            </button>
          </control>
        </field>
      </form>
    </card-component>
  </main-section>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import Divider from '@/components/Divider'
import Field from '@/components/Field'
import Control from '@/components/Control'
import FilePicker from '@/components/FilePicker'

export default {
  name: 'Profile',
  components: {
    MainSection,
    UserAvatar,
    Tiles,
    HeroBar,
    TitleBar,
    CardComponent,
    Divider,
    Field,
    Control,
    FilePicker
  },
  setup () {
    const store = useStore()

    const titleStack = ref(['Admin', 'Profile'])

    const userName = computed({
      get: () => store.state.userName,
      set: value => {
        store.commit('user', {
          name: value
        })
      }
    })

    const userEmail = computed({
      get: () => store.state.userEmail,
      set: value => {
        store.commit('user', {
          email: value
        })
      }
    })

    const passwordForm = reactive({
      password_current: '',
      password: '',
      password_confirmation: ''
    })

    const submit = () => {
      alert('Sample only')
    }

    return {
      userName,
      userEmail,
      titleStack,
      passwordForm,
      submit
    }
  }
}
</script>
