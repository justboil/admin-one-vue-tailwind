<script setup>
import { onMounted, reactive } from "vue";
import {
  mdiAccount,
  mdiGithub
} from "@mdi/js";
import SectionMain from "/src/components/SectionMain.vue";
import CardBox from "/src/components/CardBox.vue";
import BaseButton from "/src/components/BaseButton.vue";
import LayoutAuthenticated from "/src/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "/src/components/SectionTitleLineWithButton.vue";
import { useUserStore } from "../stores/user";
import axios from "axios";
import BaseLevel from "/src/components/BaseLevel.vue";
import UserAvatar from "/src/components/UserAvatar.vue";
import TablesView from "./TablesView.vue";
import CustomTable from "@/components/Custom/CustomTable.vue";

const userStore = useUserStore();

const mockRecommendUsers = {
  "id": 1,
  "studyId": 51,
  "recommendations": [
    {
      "username": 264,
      "weight": 3
    },
    {
      "username": 35,
      "weight": 2
    },
    {
      "username": 258,
      "weight": 2
    },
    {
      "username": 17,
      "weight": 2
    },
    {
      "username": 29,
      "weight": 2
    },
    {
      "username": 43,
      "weight": 2
    },
    {
      "username": 1,
      "weight": 2
    },
    {
      "username": 23,
      "weight": 1
    },
    {
      "username": 271,
      "weight": 2
    }
  ]
};

onMounted(() => {
  userStore.fetch("mockRecommend", []);
});

const submit = () => {
  userStore.fetch("mockRecommend", mockRecommendUsers.recommendations);
};

const onClickInviteButton = (index) => {
  const userId = mockRecommendUsers.recommendations[index].username;

  axios.post(`http://54.180.3.122:8080/study/studyRoom/${mockRecommendUsers.studyId}/${userId}`)
    .then(response =>{
      console.log(response)
    })
    .catch(err => console.log(err))
};

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="스터디" main>
        <BaseButton
          href="https://github.com/wildDoubt/scone-frontend"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <!--      <CustomTable></CustomTable>-->
      <BaseButton label="멤버 추천" @click.prevent="submit"></BaseButton>
      <CardBox is-hoverable v-for="(member, index) in userStore.recommendations" :index="index">
        <p>{{ index + 1 }}. {{ member.username }}</p>
        <BaseButton label="멤버 초대" @click="onClickInviteButton(index)"></BaseButton>
      </CardBox>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
