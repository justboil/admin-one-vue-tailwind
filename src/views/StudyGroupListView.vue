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

const userStore = useUserStore();
const mockStudyGroupList = [
  {
    "studyId": 51,
    "studyName": "스프링 정복",
    "topic": "SPRING"
  }
];
const fetchStudyGroupList = () => {
  axios.get("/study/studyRooms")
    .then(response => {
        if (response.status === 200) {
          userStore.studyList = response.data
          console.log(response.data);
        }
      }
    )
    .catch(() => {
      alert("스터디 그룹 가져오기 실패");
    });
};

onMounted(() => {
  fetchStudyGroupList();
});

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="스터디 그룹 리스트" main>
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


      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox v-for="studyGroup in userStore.studyList">
          <div class="text-center md:text-left overflow-hidden">
            <h4 class="text-xl text-ellipsis">
              스터디 이름: {{ studyGroup.studyName }}
            </h4>
          </div>
          <div class="text-center md:text-left overflow-hidden">
            <h4 class="text-xl text-ellipsis">
              스터디 주제: {{ studyGroup.topic }}
            </h4>
          </div>
          <BaseButton label="스터디 입장" :to="'/studyGroup/'+studyGroup.studyId"></BaseButton>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
