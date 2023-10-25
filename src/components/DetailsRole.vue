<script setup>
import { ref, onMounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionMain from "./SectionMain.vue";
import { useRoute } from 'vue-router';
import { capitalizeFirstLetter } from "@/commons/constant";
import { useRoleStore } from "@/stores/role";
import { usePermissionStore } from "@/stores/permission";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiPlus, mdiBriefcase } from "@mdi/js";

const route = useRoute();
const roleId = route.params.id;

const isLoading = ref(true);

const permissionStore = usePermissionStore();
const roleStore = useRoleStore();

const role = ref(null);
const roleList = ref(null);
const rolePermissions = ref([]);
const rolePermissionIds = ref([]);

const errorMsg = ref('');
const successMsg = ref('');

async function fetchPermissions(filters) {
  isLoading.value = true;
  try {
    const response = await permissionStore.permissions(filters);
    role.value = response.data;

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

async function fetchRoles() {
  isLoading.value = true;
  try {
    const response = await roleStore.allRoles();
    roleList.value = response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

async function fetchRole() {
  isLoading.value = true;
  try {
    const response = await roleStore.viewRole(roleId);
    if (typeof response.data !== 'undefined') {
      role.value = response.data;
      rolePermissions.value = role.value.permissions;
      rolePermissionIds.value = role.value.permission_ids;
    }

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}


onMounted(async () => {
  await fetchRoles();
  await fetchRole();
});

const updateRolePermission = async () => {
  errorMsg.value = '';
  successMsg.value = '';

  const checkedValues = [];
  const checkboxes = document.querySelectorAll('input[name="selectedPermissions[]"]:checked');

  checkboxes.forEach((checkbox) => {
    const parsedValue = parseInt(checkbox.value, 10); // Parse value to integer
    if (!isNaN(parsedValue)) {
      checkedValues.push(parsedValue);
    }
  });
  checkedValues.sort();

  const removePermissions = rolePermissionIds.value.filter((permissionId) => !checkedValues.includes(permissionId));
  const addPermissions = checkedValues.filter((permissionId) => !rolePermissionIds.value.includes(permissionId));

  if (addPermissions.length > 0 || removePermissions.length > 0) {
    const filters = {'add': addPermissions, 'remove': removePermissions}
    isLoading.value = true;
    try {
      const response = await roleStore.updateRolePermission(filters, roleId);
      if (response.message !== 'undefined' && response.message !== null ) {
        if (response.message && response.message.includes('success')) {
          successMsg.value = response.message;
          fetchRole();
        } else {
          errorMsg.value = response.message;
        }
      } else {
        errorMsg.value = "Something went wrong";
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMsg.value = 'Please make sure to make any changes to update the role';
  }
  if (errorMsg.value.length > 0 || successMsg.value.length > 0)
  setTimeout(() => {
    errorMsg.value = '';
    successMsg.value = '';
  }, 5000);
}

const isPermissionSelected = (rolePermissions, permissionName) => {
  return rolePermissions.includes(permissionName);
};

</script>

<template>
  <SectionMain>
    <div v-if="isLoading" class="text-center p-4">
      <div class="flex justify-center items-center">
        <div class="w-5 h-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
    <div v-else>
      <div v-if="role">
        <SectionTitleLineWithButton :icon="mdiBriefcase" :title="'Role Name - ' + capitalizeFirstLetter(role.name)" main>
          <BaseButton
            href="/role/create"
            :icon="mdiPlus"
            label="Add Role"
            color="contrast"
            rounded-full
            small
          />
        </SectionTitleLineWithButton>
        <div class="grid grid-cols-1 gap-6 mb-6 ">
          <CardBox form @submit.prevent="updateRolePermission">
            <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>
            <div v-if="successMsg" class="text-green-500">{{ successMsg }}</div>

            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="role in roleList" :key="role.id" class="flex flex-col">
                  <span class="font-semibold">{{ capitalizeFirstLetter(role.name) }}</span>
                  <div v-for="permission in role.permissions" :key="permission.id">
                    <label class="flex items-center gap-2">
                      <input
                        type="checkbox"
                        :checked="isPermissionSelected(rolePermissions, permission.name)"
                        name="selectedPermissions[]"
                        :value="permission.id"
                      />
                      <span>{{ permission.name }} </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <template #footer>
              <BaseButtons class="flex justify-end">
                <BaseButton type="submit" color="success" label="Update the Role with Permission"  @click="updateRolePermission" />
              </BaseButtons>
            </template>
          </CardBox>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Role could not found!!! Please contact the administrator</p>
      </div>
    </div>
  </SectionMain>
</template>
