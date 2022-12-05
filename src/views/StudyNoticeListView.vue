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
import { useRouter } from "vue-router";
import BaseDivider from "../components/BaseDivider";

const userStore = useUserStore();

const router = useRouter();

const fetchStudyNoticeList = () => {
  axios.get(`/study/${router.currentRoute.value.params.studyId}/notices`)
    .then(response => {
        if (response.status === 200) {
          userStore.studyNoticeList = response.data
          console.log(response.data);
        }
      }
    )
    .catch(() => {
      alert("스터디 공지사항 가져오기 실패");
    });
};

onMounted(() => {
  fetchStudyNoticeList();
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

      <CardBox v-for="notice in userStore.studyNoticeList">
        <div>글 제목: {{notice.title}}</div>
        <div>글 작성자: {{notice.writer}}</div>
        <div>글 내용: {{notice.contents}}</div>
        <BaseDivider/>
        <div v-for="comment in userStore.studyNoticeList.comments">
          <div>댓글 작성자: {{comment.writer}}</div>
          <div>댓글 내용: {{comment.contents}}</div>
        </div>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
