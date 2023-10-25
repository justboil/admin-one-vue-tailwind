<script setup>
import { ref } from "vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
import BaseButtons from "./BaseButtons.vue";
import BaseButton from "./BaseButton.vue";
import { regexWithoutSpace, handleError } from "@/commons/constant";
import { useRoleStore } from "@/stores/role";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiBriefcase, mdiMagnify } from "@mdi/js";

const roleStore = useRoleStore();

const isLoading = ref(false);

const newRoleName = ref('');
const defaultRoleName = ref('');

const resetForm = () => {
  newRoleName.value = defaultRoleName.value;
}

const errorMessage = ref('');
const errorName = ref('');
const successMessage = ref('');

const submitForm = async () => {

  errorMessage.value = '';
  errorName.value = '';
  successMessage.value = '';

  if (!newRoleName.value) {
    errorName.value = "Please enter the new Role name";
    return;
  } else if (!regexWithoutSpace.test(newRoleName.value)) {
    errorName.value = "Role name can only contain alphabet characters";
    return;
  } else if (newRoleName.value.length < 3) {
    errorName.value = "Please enter atleast 3 characters to create a new role";
    return;
  }

  const checkedValues = [];
  const checkboxes = document.querySelectorAll('input[name="selectedPermissions[]"]:checked');

  checkboxes.forEach((checkbox) => {
    const parsedValue = parseInt(checkbox.value, 10); // Parse value to integer
    if (!isNaN(parsedValue)) {
      checkedValues.push(parsedValue);
    }
  });
  checkedValues.sort();

  try {
    const formFilters = {
      name: newRoleName.value,
      permissions: checkedValues
    };
    const response = await roleStore.createRole(formFilters);

    if(response.status === 201) {
      successMessage.value = response.data.message;
      resetForm();
    } else {
      errorMessage.value = (handleError(response));
    }

  } catch (error) {
    errorMessage.value = "An error occurred while creating the new role.";
    if (error.name !== 'undefined') {
      errorMessage.value = error.name;
    }
  }
}
</script>

<template>
  <div v-if="isLoading" class="text-center p-4">
    <div class="flex justify-center items-center">
      <div class="w-5 h-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  </div>
  <div v-else>
    <div class="grid">
      <SectionTitleLineWithButton :icon="mdiBriefcase" title="Roles" main>
        <BaseButton
          href="/roles"
          :icon="mdiMagnify"
          label="View Roles"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submitForm">
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
        <div v-if="errorName" class="text-red-500">{{ errorName }}</div>
        <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
        <FormField label="Role Name">
          <FormControl type="text" v-model="newRoleName" />
        </FormField>
        <FormField label="Add Default Permissions for the new role">
          <div class="flex flex-wrap items-center">
            <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-2">
              <input type="checkbox" name="selectedPermissions[]" id="viewPermission" value="view" class="mr-2">
              <label for="viewPermission">View</label>
            </div>

            <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-2">
              <input type="checkbox" name="selectedPermissions[]" id="addPermission" value="add" class="mr-2">
              <label for="addPermission">Add</label>
            </div>

            <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-2">
              <input type="checkbox" name="selectedPermissions[]" id="editPermission" value="edit" class="mr-2">
              <label for="editPermission">Edit</label>
            </div>

            <div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
              <input type="checkbox" name="selectedPermissions[]" id="deletePermission" value="delete" class="mr-2">
              <label for="deletePermission">Delete</label>
            </div>
          </div>
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Create Role" @click="submitForm" />
            <BaseButton type="reset" color="info" outline label="Reset" @click="resetForm" />
          </BaseButtons>
        </template>
      </CardBox>
    </div>

  </div>
</template>
