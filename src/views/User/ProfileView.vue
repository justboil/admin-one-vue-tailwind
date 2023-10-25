<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { handleError, regex, removeNullProperties } from "@/commons/constant";
import { useUserStore } from "@/stores/user";

const mainStore = useMainStore();
const userStore = useUserStore();

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail,
});

const errorPasswordMessage = ref('');
const errorNameMessage = ref('');
const successPasswordMessage = ref('');
const successNameMessage = ref('');

const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: "",
});

const resetPasswordForm = () => {
  passwordForm.password_current = '';
  passwordForm.password = '';
  passwordForm.password_confirmation = '';
};

const submitProfile = async () => {
  errorNameMessage.value = '';
  successNameMessage.value = '';

  if (!profileForm.name) {
    errorNameMessage.value = "Please enter your name aleast with 3 characters to proceed";
    return;
  } else if (profileForm.name === localStorage.getItem('userName')) {
    errorNameMessage.value = "Cannot update the same name as before";
    return;
  } else if (profileForm.name.length < 3) {
    errorNameMessage.value = "Please enter atleast 3 characters to update your name";
    return;
  } else if (!regex.test(profileForm.name)) {
    errorNameMessage.value = "Full name can only contain alphabet characters and spaces";
    return;
  }

  try {
    const formFilters = {
      name: profileForm.name
    };
    const response = await userStore.updateUser(formFilters, localStorage.getItem('userId'));

    if(response.status === 200) {
      successNameMessage.value = response.data.message;
      localStorage.setItem('userName', profileForm.name);
      mainStore.setUser(profileForm);
    } else {
      errorNameMessage.value = (handleError(response));
    }
  } catch (error) {
    errorNameMessage.value = handleError(error);
  }
};

const submitPass = async () => {
  errorPasswordMessage.value = '';
  successPasswordMessage.value = '';

  if (!passwordForm.password_current) {
    errorPasswordMessage.value = "Please enter your current password";
    return;
  } else if (!passwordForm.password) {
    errorPasswordMessage.value = "Please enter your new password";
    return;
  } else if (!passwordForm.password.length < 8) {
    errorPasswordMessage.value = "Please enter a password with atleast 8 characters";
    return;
  } else if (!passwordForm.password !== passwordForm.password_confirmation) {
    errorPasswordMessage.value = "New password and confirm password is not matching.";
    return;
  } else {
    errorPasswordMessage.value = "";
  }

  try {
    const formFilters = {
      current_password: passwordForm.password_current,
      password: passwordForm.password,
      password_confirmation: passwordForm.password_confirmation
    };
    const response = await userStore.changeUserPassword(formFilters, localStorage.getItem('userId'));

    if(response.status === 200) {
      successPasswordMessage.value = response.data.message;
      resetPasswordForm();
    } else {
      errorPasswordMessage.value = (handleError(response));
    }
  } catch (error) {
    errorPasswordMessage.value = handleError(error);
  }
};

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <!-- <FormField label="Profile Picture" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField> -->

          <FormField label="Name" help="Your name">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <!-- <FormField label="E-mail" help="Your e-mail">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              autocomplete="email"
            />
          </FormField> -->

          <div v-if="successNameMessage" class="text-green-500">{{ successNameMessage }}</div>
          <div v-if="errorNameMessage" class="text-red-500">{{ errorNameMessage }}</div>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField
            label="Current password"
            help="Required. Your current password"
          >
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirm password"
            help="Required. New password one more time"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <div v-if="successPasswordMessage" class="text-green-500">{{ successPasswordMessage }}</div>
          <div v-if="errorPasswordMessage" class="text-red-500">{{ errorPasswordMessage }}</div>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Submit" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
