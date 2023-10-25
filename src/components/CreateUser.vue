<script setup>
import { ref, onMounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
import BaseButtons from "./BaseButtons.vue";
import BaseButton from "./BaseButton.vue";
import { useRoleStore } from "@/stores/role";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { emailRegex, generateRandomPassword, handleError, permissionsToUserAdd, regex, removeNullProperties } from "@/commons/constant";
import { useUserStore } from "@/stores/user";
import { mdiMagnify, mdiTableBorder } from "@mdi/js";

const roleStore = useRoleStore();
const userStore = useUserStore();

const isLoading = ref(false);

const defaultRoleName = "employee";
const roleList = ref([]);
const filteredRoleList = ref([]);

const fullName = ref('');
const email = ref('');
const selectedRole = ref(null);
const password = ref('');

const successMessage = ref('');
const errorMessage = ref('');
const errorName = ref('');
const errorEmail = ref('');

const defaultName = ref('');
const defaultEmail = ref('');
const defaultSelectedRole = ref(null);

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const currentUserOnlyAddPermissions =
  currentUserPermissions
  .filter(permission => permission.includes(':add'))
  .map(permission => permission.replace(':add', ''));
const hasAccessToCreateUser = permissionsToUserAdd.some(permission => currentUserPermissions.includes(permission));


async function fetchRoles() {
  isLoading.value  = true;
  try {
    const response = await roleStore.roles({ all: true });
    roleList.value = response.data;
    const filteredRoles = roleList.value.filter((role) => role.is_user === 1);
    filteredRoleList.value = currentUserPermissions.includes('admin') ? filteredRoles : filteredRoles.filter(role => currentUserOnlyAddPermissions.includes(role.name));
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value  = false;
  }
}

const refreshPassword = () => {
  password.value = generateRandomPassword();
};

onMounted( async () => {

  if (hasAccessToCreateUser) {
    await fetchRoles();
  }

  if (roleList.value.length > 0) {
    const employeeRole = roleList.value.find(role => role.name === defaultRoleName);
    defaultSelectedRole.value = employeeRole.id;
    selectedRole.value = employeeRole.id;
  }

  password.value = generateRandomPassword();

});

const resetForm = () => {
  fullName.value = defaultName.value;
  email.value = defaultEmail.value;
  selectedRole.value = defaultSelectedRole.value;
}

const submitForm = async () => {

  errorMessage.value = '';
  errorName.value = '';
  errorEmail.value = '';
  successMessage.value = '';


  if (!fullName.value ) {
    errorName.value = "Please enter user's full name";
    return;
  } else if (!regex.test(fullName.value)) {
    errorName.value = "Full name can only contain alphabet characters and spaces";
  }

  if (!email.value) {
    errorEmail.value = "Please enter an email address";
    return;
  } else if (!emailRegex.test(email.value)) {
    errorEmail.value = "Please enter a valid email address";
    return;
  }

  if (!password.value) {
    errorMessage.value = "Please enter a password for the user";
    return;
  } else if (password.value.length < 8) {
    errorMessage.value = "Please enter a password with atleast 8 chracters";
    return;
  } else {
    errorMessage.value = '';
  }

  try {
    const formFilters = {
      name: fullName.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value,
      role: selectedRole.value
    };
    removeNullProperties(formFilters);
    const response = await userStore.createUser(formFilters);

    if(response.status === 201) {
      successMessage.value = response.data.message;
      resetForm();
    } else {
      errorMessage.value = (handleError(response));
    }

    // router.push(`/user/${response.data.data.id}`);
  } catch (error) {
    errorMessage.value = "An error occurred while creating the user.";
  }

}

</script>

<template>
  <div v-if="hasAccessToCreateUser">
    <div v-if="isLoading" class="text-center p-4">
      <div class="flex justify-center items-center">
        <div class="w-5 h-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
    <div v-else>
      <div class="grid">
        <SectionTitleLineWithButton :icon="mdiTableBorder" title="Users" main>
          <BaseButton
            href="/users"
            :icon="mdiMagnify"
            label="View Users"
            color="contrast"
            rounded-full
            small
          />
        </SectionTitleLineWithButton>
        <CardBox form @submit.prevent="submitForm">
          <div class="mb-3">
            <b><label for="name" class="required">Full Name</label></b>
            <div v-if="errorName" class="text-red-500">{{ errorName }}</div>
          </div>
          <FormField>
            <FormControl type="text" v-model="fullName" placeholder="Enter user's Full Name" />
          </FormField>

          <div class="mb-3">
            <b><label for="email" class="required">Email</label></b>
            <div v-if="errorEmail" class="text-red-500">{{ errorEmail }}</div>
          </div>
          <FormField>
            <FormControl type="email" name="email" v-model="email" placeholder="Enter user's Full Name" />
          </FormField>

          <FormField label="Role">
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="selectedRole"
              small
            >
              <option
                v-for="role in filteredRoleList"
                :key="role.id"
                :value="role.id"
              >
                {{ role.name }}
              </option>
            </select>
          </FormField>

          <FormField label="Password">
            <div class="flex items-center">
              <FormControl name="password" v-model="password" placeholder="Enter user's password" />
              <button @click="refreshPassword" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024">
                  <path d="M511.28 0C255.472 0 47.36 208.126 47.36 463.934c0 240.448 185.296 441.536 423.568 462.096l-91.856 46.56c-11.344 6.223-18.096 20.223-11.376 31.279l3.248 8.4c6.752 11.056 21.376 14.976 32.687 8.783l153.312-78.496c.193-.128.4-.095.593-.223l10.288-5.632c5.68-3.12 9.44-8.224 10.943-13.903c1.569-5.68.85-12-2.527-17.504l-6.096-10c-.095-.193-.288-.32-.4-.496L475.055 746.83c-6.72-11.056-21.311-14.976-32.687-8.784l-7.44 5.184c-11.344 6.192-12.096 22.192-5.376 33.217l55.872 86.672c-.304-.016-.576-.128-.865-.144c-209.28-13.727-373.2-189.039-373.2-399.039C111.36 243.408 290.767 64 511.28 64c220.544 0 400.96 179.408 400.96 399.937c0 126.976-58.32 243.6-160 319.968c-14.127 10.624-16.975 30.689-6.367 44.817c10.624 14.16 30.689 16.976 44.817 6.368c117.936-88.592 185.567-223.872 185.567-371.152C976.24 208.129 767.105 0 511.28 0z"/>
                </svg>
              </button>
            </div>
          </FormField>

          <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Create User" @click="submitForm" />
              <BaseButton type="reset" color="info" outline label="Reset" @click="resetForm" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center h-screen text-center" v-else>
    You have no access to create a new user
  </div>

</template>

<style>
  .required::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
</style>
