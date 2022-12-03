<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "/src/components/SectionFullScreen.vue";
import CardBox from "/src/components/CardBox.vue";
import axios from "axios";
import FormField from "/src/components/FormField.vue";
import FormControl from "/src/components/FormControl.vue";
import BaseButton from "/src/components/BaseButton.vue";
import BaseButtons from "/src/components/BaseButtons.vue";
import LayoutGuest from "/src/layouts/LayoutGuest.vue";

const form = reactive({
  email: "",
  pass: ""
});

const router = useRouter();

const submit = () => {
  var data = JSON.stringify({
    "availableTimes": [
      {
        "yoil": "MON",
        "startTime": "_1",
        "endTime": "_3"
      },
      {
        "yoil": "MON",
        "startTime": "_8",
        "endTime": "_11"
      },
      {
        "yoil": "WED",
        "startTime": "_1",
        "endTime": "_3"
      },
      {
        "yoil": "FRI",
        "startTime": "_2",
        "endTime": "_8"
      }
    ],
    "address": "서울시 송파구 가락1동",
    "name": "강아지",
    "birth": "2022-07-03",
    "email": "test2@naver.com",
    "password": "Test123!",
    "passwordCheck": "Test123!",
    "nickname": "test2",
    "gender": "M",
    "technologyStacks": [
      {
        "stack": "SPRING"
      },
      {
        "stack": "REACT"
      }
    ],
    "phoneNumber": "010-6301-2268",
    "job": "학생",
    "preferLocation": "Seoul",
    "ageRange": "Ten",
    "preferSize": 20
  });

  var config = {
    method: "post",
    url: "https://localhost:8080/members/signup",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  axios(config)
    .then(function(response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="이메일">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="username"
          />
        </FormField>

        <FormField label="비밀번호">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="회원가입" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
