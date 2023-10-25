<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const authStore = useAuthStore(pinia);


const form = reactive({
  email: "",
  password: "",
  error: "",
  // remember: false,
});

const router = useRouter();

async function logout() {
  try {
    authStore.logout();
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

logout();

const submit = async () => {
  if (!form.email) {
    form.error = "Please enter email.";
    return;
  }else if (!form.password) {
    form.error = "Please enter password.";
    return;
  }

  form.error = "";

  try {
    const response = await authStore.login({
      email: form.email,
      password: form.password,
    });

    if(typeof response === 'boolean') {
      router.push("/dashboard");
    } else {
      let errorMsg = "Something went wrong while trying to log in. Please check your credentials";
      if (typeof response.error === 'string') {
        errorMsg = response.error;
      } else if (typeof response.errors.email === 'object') {
        errorMsg = response.errors.email[0];
      } else if (typeof response.errors.password === 'object') {
        errorMsg = response.errors.password[0];
      }
      form.error = errorMsg;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <!-- <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        /> -->

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
        <p v-if="form.error" class="text-red-500">{{ form.error }}</p>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
