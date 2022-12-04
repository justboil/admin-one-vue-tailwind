<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "/src/stores/main";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "/src/components/BaseLevel.vue";
import UserAvatarCurrentUser from "/src/components/UserAvatarCurrentUser.vue";
import CardBox from "/src/components/CardBox.vue";
import FormCheckRadio from "/src/components/FormCheckRadio.vue";
import PillTag from "/src/components/PillTag.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const userName = computed(() => userStore.userInfo.nickname);

const userSwitchVal = ref(false);
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          Howdy, <b>{{ userName }}</b
          >!
        </h1>
        <p>Last login <b>12 minutes ago</b> from <b>127.0.0.1</b></p>
        <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
