<script setup>
import SectionFullScreen from "/src/components/SectionFullScreen.vue";
import CardBox from "/src/components/CardBox.vue";
import BaseButton from "/src/components/BaseButton.vue";
import BaseButtons from "/src/components/BaseButtons.vue";
import LayoutGuest from "/src/layouts/LayoutGuest.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router/dist/vue-router";
import FormField from "/src/components/FormField.vue";
import FormControl from "/src/components/FormControl.vue";
import FormCheckRadioGroup from "/src/components/FormCheckRadioGroup.vue";
import LayoutAuthenticated from "/src/layouts/LayoutAuthenticated.vue";
import SectionMain from "/src/components/SectionMain.vue";
import axios from "axios";

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
  temp:0,
  study: {
    preferStack: [],
    preferLocation: "",
    ageRange: "",
    availableTimes: [],
    preferSize: "",
    description:"",
    codingLevel:"",
    type: ""
  }
});

const router = useRouter();

const jobOptions = [
  "학생",
  "직장인",
  "기타"
];

const codingLevelOptions = [
  "S",
  "A",
  "B",
  "C",
  "D",
  "F",
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

const publicOptions = [
  "Public", "Private"
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
  var data = JSON.stringify({
    "studyName": form.name,
    "topic": {
      "stack": form.study.preferStack
    },
    "size": form.study.preferSize,
    "codingLevel": form.study.codingLevel,
    "studyType": form.study.type,
    "gender": form.gender,
    "location": form.study.preferLocation.id,
    "ageRange": form.study.ageRange.id,
    "description": form.study.description,
    "passionTemperature":form.temp,
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
    ]
  });
  console.log(JSON.parse(data))
  var config = {
    method: 'post',
    url: '/study/studyRoom',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="제목">
          <FormControl
            v-model="form.name"
            name="name"
          />
        </FormField>
        <FormField label="선호 성별">
          <FormControl
            v-model="form.gender"
            name="gender"
          />
        </FormField>
        <FormField label="설명">
          <FormControl
            v-model="form.study.description"
            name="description"
          />
        </FormField>
        <FormField label="선호 스택">
          <FormControl
            v-model="form.study.preferStack"
          />
        </FormField>
        <FormField label="코딩 수준">
          <FormControl
            v-model="form.study.codingLevel"
            type="select"
            :options=codingLevelOptions
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
        <FormField label="스터디 공개여부">
          <FormControl
            v-model="form.study.type"
            type="select"
            :options=publicOptions
          />
        </FormField>
        <FormField label="스터디 사이즈">
          <FormControl
            v-model="form.study.preferSize"
            type="number"
          />
        </FormField>
        <FormField label="열정 온도">
          <FormControl
            v-model="form.temp"
            type="number"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="스터디 생성" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
