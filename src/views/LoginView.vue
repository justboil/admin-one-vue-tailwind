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
import { useUserStore } from "../stores/user";

const form = reactive({
  email: "",
  pass: ""
});

const router = useRouter();

const userStore = useUserStore();

const submit = () => {
  axios.post("/members/signin", {
    email: form.email,
    password: form.pass
  }
  , {
    withCredentials: true
  }
  )
    .then(response => {
        if (response.status === 200) {
          console.log("cookie", response.headers["set-cookie"]);
          userStore.setUser(response.data);
          router.push("/dashboard");
        }
      }
    )
    .catch(() => {
      alert("로그인 실패");
    });
  // router.push("/dashboard");
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Email" help="Please enter your email">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>
        <BaseButton label="회원가입" to="/sign-up"></BaseButton>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
