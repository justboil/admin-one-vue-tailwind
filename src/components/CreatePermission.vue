<script setup>
import { onMounted, ref, watch } from "vue";
import CardBox from "@/components/CardBox.vue";
import FormControl from "./FormControl.vue";
import BaseButtons from "./BaseButtons.vue";
import BaseButton from "./BaseButton.vue";
import { regexWithoutSpace, handleError } from "@/commons/constant";
import { useRoleStore } from "@/stores/role";
import { usePermissionStore } from "@/stores/permission";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiBriefcase, mdiMagnify } from "@mdi/js";
import FormField from "./FormField.vue";

const roleStore = useRoleStore();
const permissionStore = usePermissionStore();

const isLoading = ref(false);

const newPermissionName = ref('');
const defaultPermissionName = ref('');

const selectedRole = ref(null);
const previewPermission = ref(null);

const roleList = ref(null);

async function fetchAllRoles() {
  isLoading.value = true;
  try {
    const response = await roleStore.allRoles();
    roleList.value = response.data.filter((role) => role.name !== 'admin');
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}

onMounted( async () => {
  await fetchAllRoles();
});

const resetForm = () => {
  newPermissionName.value = defaultPermissionName.value;
}

const errorMessage = ref('');
const errorName = ref('');
const successMessage = ref('');

const submitForm = async () => {
  errorMessage.value = '';
  errorName.value = '';
  successMessage.value = '';

  if (selectedRole.value === null) {
    errorName.value = "Role should be selected to proceed";
    return;
  }

  if (!newPermissionName.value) {
    errorName.value = "Please enter the new Permission name";
    return;
  } else if (!regexWithoutSpace.test(newPermissionName.value)) {
    errorName.value = "Permission can only contain alphabet characters";
    return;
  } else if (newPermissionName.value.length < 3) {
    errorName.value = "Please enter atleast 3 characters to create a new permission";
    return;
  }

  try {
    const formFilters = {
      name: `${selectedRole.value}:${newPermissionName.value}`
    };
    const response = await permissionStore.createPermission(formFilters);

    if(response.status === 201) {
      successMessage.value = response.data.message;
      resetForm();
    } else {
      errorMessage.value = (handleError(response));
    }

  } catch (error) {
    errorMessage.value = "An error occurred while creating the new permission.";
    if (error.name !== 'undefined') {
      errorMessage.value = error.name;
    }
  }
}

const watchNewPermissionName = () => {
  // When newPermissionName changes, update previewPermission
  watch(newPermissionName, (newVal) => {
    if (selectedRole.value) {
      previewPermission.value = `${selectedRole.value}: ${newVal}`;
    }
  });
};

watchNewPermissionName();
</script>

<template>
  <div v-if="isLoading" class="text-center p-4">
    <div class="flex justify-center items-center">
      <div class="w-5 h-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  </div>
  <div v-else>
    <div class="grid">
      <SectionTitleLineWithButton :icon="mdiBriefcase" title="Permissions" main>
        <BaseButton
          href="/permissions"
          :icon="mdiMagnify"
          label="View Permissions"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submitForm">
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
        <div v-if="errorName" class="text-red-500">{{ errorName }}</div>
        <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormField label="Role">
              <div class="relative">
                <select v-model="selectedRole" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option disabled selected value="null">Select a Role</option>
                  <option v-for="role in roleList" :key="role.id" :value="role.name">{{ role.name }}</option>
                </select>
              </div>
            </FormField>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormField label="Permission Name">
              <FormControl type="text" v-model="newPermissionName" placeholder="First select a role and type to preview permission" />
            </FormField>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <FormField label="Permission Preview" v-if="previewPermission !== null">
            {{previewPermission}}
          </FormField>
        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Create Permission" @click="submitForm" />
            <BaseButton type="reset" color="info" outline label="Reset" @click="resetForm" />
          </BaseButtons>
        </template>
      </CardBox>
    </div>

  </div>
</template>
