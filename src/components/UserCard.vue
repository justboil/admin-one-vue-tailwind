<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiCheckDecagram } from '@mdi/js'
import Level from '@/components/Level.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Pill from '@/components/Pill.vue'

const mainStore = useMainStore()

const userName = computed(() => mainStore.userName)

const userSwitchVal = ref([])
</script>

<template>
  <card-component rounded="">
    <level type="justify-around lg:justify-center">
      <user-avatar class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <check-radio-picker
            v-model="userSwitchVal"
            name="sample-switch"
            type="switch"
            :options="{ one: 'Notifications' }"
          />
        </div>
        <h1 class="text-2xl">
          Howdy, <b>{{ userName }}</b>!
        </h1>
        <p>Last login <b>12 mins ago</b> from <b>127.0.0.1</b></p>
        <div class="flex justify-center md:block">
          <pill
            text="Verified"
            type="info"
            :icon="mdiCheckDecagram"
          />
        </div>
      </div>
    </level>
  </card-component>
</template>
