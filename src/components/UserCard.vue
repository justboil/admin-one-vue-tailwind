<template>
  <card-component class="items-center" rounded="">
    <level type="justify-around lg:justify-center">
      <user-avatar class="lg:mx-12" button/>
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <check-radio-picker
            name="sample-switch"
            type="switch"
            v-model="userSwitchVal"
            :options="{ one: 'Notifications' }"/>
        </div>
        <h1 class="text-2xl">Howdy, <b>{{ userName }}</b>!</h1>
        <p>Last login <b>12 mins ago</b> from <b>127.0.0.1</b></p>
        <div class="flex justify-center md:block">
          <pill text="Verified" type="info" :icon="mdiCheckDecagram"/>
        </div>
      </div>
    </level>
  </card-component>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { mdiCheckDecagram } from '@mdi/js'
import Level from '@/components/Level'
import UserAvatar from '@/components/UserAvatar'
import CardComponent from '@/components/CardComponent'
import CheckRadioPicker from '@/components/CheckRadioPicker'
import Pill from '@/components/Pill'

export default {
  name: 'UserCard',
  components: {
    Level,
    UserAvatar,
    CardComponent,
    CheckRadioPicker,
    Pill
  },
  setup () {
    const store = useStore()

    const userName = computed(() => store.state.userName)

    const userSwitchVal = ref([])

    watch(userSwitchVal, value => {
      store.dispatch('pushMessage', value && value.indexOf('one') > -1 ? 'Success! Now active' : 'Done! Now inactive')
    })

    return {
      userName,
      userSwitchVal,
      mdiCheckDecagram
    }
  }
}
</script>
