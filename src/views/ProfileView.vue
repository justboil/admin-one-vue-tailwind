<script setup>
import { onBeforeMount, reactive } from "vue";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub
} from "@mdi/js";
import SectionMain from "/src/components/SectionMain.vue";
import CardBox from "/src/components/CardBox.vue";
import BaseDivider from "/src/components/BaseDivider.vue";
import FormField from "/src/components/FormField.vue";
import FormControl from "/src/components/FormControl.vue";
import FormFilePicker from "/src/components/FormFilePicker.vue";
import BaseButton from "/src/components/BaseButton.vue";
import BaseButtons from "/src/components/BaseButtons.vue";
import UserCard from "/src/components/UserCard.vue";
import LayoutAuthenticated from "/src/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "/src/components/SectionTitleLineWithButton.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import axios from "axios"

const router = useRouter();

const userStore = useUserStore();

const profileForm = reactive({
  name: userStore.userInfo.nickName,
  email: userStore.userInfo.email
});

const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: ""
});

const profile = reactive({});
let invitations = reactive([])

const submitProfile = () => {
  // mainStore.setUser(profileForm);
};

const submitPass = () => {
  //
};

onBeforeMount(() => {
  // userStore.setUser({
  //   "createdDate": "2022-12-04T12:46:09.923007",
  //   "lastModifiedDate": "2022-12-04T12:46:09.923007",
  //   "id": 1,
  //   "address": "서울시 송파구 가락1동",
  //   "passionTemperature": null,
  //   "codingLevel": null,
  //   "name": "강아지",
  //   "birth": "2022-07-03",
  //   "email": "test2@naver.com",
  //   "password": "Test123!",
  //   "nickname": "test2",
  //   "gender": "M",
  //   "phoneNumber": "010-6301-2268",
  //   "job": "학생",
  //   "profileUrl": null,
  //   "ageRange": "Ten",
  //   "preferSize": 20,
  //   "preferLocation": "Seoul"
  // });

  if (!userStore.userInfo.email) {
    alert("유저 정보가 없습니다.");
    router.push("/dashboard");
  }
});

function filterList(targetKeys, originObj) {
  let result = {};
  Object.entries(originObj).forEach(([key, value]) => {
    if(!targetKeys.includes(key)){
      result[key] = value;
    }
  });
  return result;
}

const onClickInvitations = () => {
  axios.get("/study/invitations")
  .then(response=>{
    invitations = response.data
  })
}

const onClickAccept = (memberStudyId) => {
  axios.post(`/study/invitations/acceptance/${memberStudyId}`)
    .then(response=>console.log(response))
  .catch(error => alert(error.response))
}

const onClickDecline = (memberStudyId) => {
  axios.post(`/study/invitations/acceptance/${memberStudyId}`)
  .then(response=>console.log(response))
    .catch(error => alert(error.response))
}

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
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

      <UserCard class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <div v-for="(value, key) in filterList(['lastModifiedDate', 'createdDate', 'password', 'profileUrl', 'id', 'passionTemperature', 'codingLevel'], userStore.userInfo)" :key="key">{{ key }}: {{ value }}</div>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <BaseButton label="받은 초대 보기" @click.prevent="onClickInvitations"/>
          <div v-for="invitation in invitations">
            <li>스터디 이름: {{invitation.studyName}}</li>
            <li>스터디 설명: {{invitation.description}}</li>
            <BaseButton label="수락" @click.prevent="onClickAccept(invitation.id)"/>
            <BaseButton label="거절" @click.prevent="onClickDecline(invitation.id)"/>
          </div>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
