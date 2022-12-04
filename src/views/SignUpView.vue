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
import FormCheckRadioGroup from "/src/components/FormCheckRadioGroup.vue";

const form = reactive({
  email: "",
  pass: "",
  passCheck: "",
  name:"",
  birth:"",
  nickname: "",
  gender: "",
  phone: "",
  job: "",
  study: {
    preferStack: [],
    preferLocation: "",
    ageRange: "",
    availableTimes: [],
    preferSize: ""
  }
});

const router = useRouter();

const jobOptions = [
  "학생",
  "직장인",
  "기타"
];

const regionOptions = [
  {
    id:"Seoul",
    label:"서울"
  },
  {
    id:"Busan",
    label:"부산"
  },
  {
    id:"Incheon",
    label:"인천"
  },
  {
    id:"Daegu",
    label:"대구"
  },
]

const ageOptions = [
  {
    id:"Ten",
    label:"10대"
  },
  {
    id:"Twenty",
    label:"20대"
  },
  {
    id:"Thirty",
    label:"30대"
  },
  {
    id:"Forty",
    label:"40대"
  },
  {
    id:"Fifty",
    label:"기타"
  }
]

const submit = () => {
  console.log(form);

  var data = JSON.stringify({
    "name": form.name,
    "birth": form.birth,
    "email": form.email,
    "password": form.pass,
    "passwordCheck": form.passCheck,
    "nickname": form.nickname,
    "gender": form.gender,
    "technologyStacks": [
      {
        "stack": form.study.preferStack
      },
    ],
    "phoneNumber": form.phone,
    "job": form.job,
    "preferLocation": form.study.preferLocation.id,
    "ageRange": form.study.ageRange.id,
    "preferSize": form.study.preferSize
  });

  var config = {
    method: "post",
    url: "/members/signup",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  axios(config)
    .then(function(response) {
      console.log(JSON.stringify(response.data));
      router.push("/login")
    })
    .catch(function(error) {
      alert(error.response.data.message)
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
        <FormField label="비밀번호 확인">
          <FormControl
            v-model="form.passCheck"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>
        <FormField label="이름">
          <FormControl
            v-model="form.name"
            name="name"
          />
        </FormField>
        <FormField label="생년월일">
          <FormControl
            v-model="form.birth"
            name="birth"
          />
        </FormField>
        <FormField label="닉네임">
          <FormControl
            v-model="form.nickname"
            name="nickname"
          />
        </FormField>
        <FormCheckRadioGroup
          v-model="form.gender"
          name="remember"
          type="radio"
          :options="{ M:'Man', W:'Woman' }"
        />
        <FormField label="휴대폰 번호">
          <FormControl
            v-model="form.phone"
            autocomplete="current-password"
          />
        </FormField>
        <FormField label="직업">
          <FormControl
            v-model="form.job"
            type="select"
            :options=jobOptions
          />
        </FormField>
        <FormField label="선호 스택">
          <FormControl
            v-model="form.study.preferStack"
          />
        </FormField>
        <FormField label="선호 지역">
          <FormControl
            v-model="form.study.preferLocation"
            type="select"
            :options=regionOptions
          />
        </FormField>
        <FormField label="선호 나이대">
          <FormControl
            v-model="form.study.ageRange"
            type="select"
            :options=ageOptions
          />
        </FormField>
        <FormField label="스터디 사이즈">
          <FormControl
            v-model="form.study.preferSize"
            type="number"
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
