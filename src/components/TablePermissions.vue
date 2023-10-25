<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import CardBoxModalStateChanging from "@/components/CardBoxModalStateChanging.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxModal from "./CardBoxModal.vue";
import SectionMain from "./SectionMain.vue";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiBriefcase, mdiBriefcaseRemove, mdiEye, mdiPlus, mdiTableBorder, mdiTrashCan } from "@mdi/js";
import { usePermissionStore } from "@/stores/permission";
import { useUserStore } from "@/stores/user";
import { permissionsToPermissionAdd, permissionsToPermissionDelete, perPageOptions } from "@/commons/constant";

const permissionStore = usePermissionStore();
const userStore = useUserStore();
const excludedPermissionNames = ref(['admin', 'manager:view', 'employee:view', 'user-own:view', 'projects:view', 'tasks:view', 'roles:view', 'permissions:view' ]);

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToPermissionCreate = currentUserPermissions !== null && permissionsToPermissionAdd.some(permission => currentUserPermissions.includes(permission));
const hasAccessToPermissionDelete = currentUserPermissions !== null && permissionsToPermissionDelete.some(permission => currentUserPermissions.includes(permission));

const modalChangeType = ref("");
const currentUser = ref(null);
const noOfRoles = ref(0);
const referenceId = ref(null);
const isModalOpen = ref(false);
const isLoading = ref(true);
const perPage = ref(10);
const currentPage = ref(0);


const sortBy = 'priority_id';
const sort = 'asc';

const permissions = ref([]);
const userList = ref([]);

const numPages = ref(0);
const currentPageHuman = computed(() => currentPage.value + 1);
const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});


const goToPage = (page) => {
  isLoading.value = true;
  currentPage.value = page;
  fetchPermissions(getFilters());
};

async function fetchPermissions(filters) {
  isLoading.value = true;
  try {
    const response = await permissionStore.permissions({
      ...filters,
      limit: perPage.value,
      offset: currentPage.value * perPage.value,
    });

    permissions.value = response.data;
    numPages.value = Math.ceil(response.count / perPage.value);
    noOfRoles.value = response.count;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

async function fetchAllUsers() {
  isLoading.value = true;
  try {
    const response = await userStore.allUsers();
    userList.value = response.users;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}

const getFilters = () => {
  let filters = {};

  const sortBySelect = document.getElementById('sortBy');
  const sortSelect = document.getElementById('sort');
  if (sortSelect && sortBySelect) {
    filters = { ...filters, 'sort': ['id:desc'] };
  }

  return filters;
};

watch(perPage, async () => {
  currentPage.value = 0;

  await nextTick();
  fetchPermissions(getFilters());
});

onMounted(async () => {
  await fetchAllUsers();
  await fetchPermissions({'sort': ['id:desc'] });

});

const openModal = (type, user, refId) => {
  currentRole.value = user;
  referenceId.value = refId;
  modalChangeType.value = type;
  isModalOpen.value = true;
};

const isOpenConfirmationModal = ref(false);

const confirmationTitle = ref(null);
const confirmationBtn = ref(null);
const handleCallback = (result) => {
  if (result) {
    if (result.error !== undefined) {
      confirmationTitle.value = result.error;
      confirmationBtn.value = "danger";
    } else {
      confirmationTitle.value = result.data.message;
      confirmationBtn.value = "success";
    }
    isOpenConfirmationModal.value = true;
  }
  fetchPermissions(getFilters());
};

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
          href="/permission/create"
          :icon="mdiPlus"
          label="Add Permission"
          color="contrast"
          rounded-full
          small
          v-if="hasAccessToPermissionCreate"
        />
      </SectionTitleLineWithButton>

    </div>
    <br />
    <div class="grid">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-right whitespace-nowrap" v-if="hasAccessToPermissionDelete">Created By</th>
            <th class="text-center" v-if="hasAccessToPermissionDelete">Actions</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="permission in permissions" :key="permission.id">
            <td data-label="Role">
              {{ permission.name }}
            </td>
            <td data-label="CreatedBy" class="text-right" v-if="hasAccessToPermissionDelete">
              {{ (userList.find(u => u.id === permission.user_id) || {}).name || '-' }}
            </td>

            <td class="before:hidden lg:w-1 whitespace-nowrap text-right"> <!-- Apply text-center class here -->
              <BaseButtons type="justify-start lg:justify-end" no-wrap>
                <div v-if="hasAccessToPermissionDelete && !excludedPermissionNames.includes(permission.name)">
                  <BaseButton
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                  />
                </div>
              </BaseButtons>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'" small @click="goToPage(page)" />
        </BaseButtons>
        <small>
          Per Page
          <select v-model="perPage"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="perPage">
            <option v-for="perPage in perPageOptions" :key="perPage" :value="perPage">{{ perPage }}</option>
          </select>
          {{ noOfRoles }} permission{{ noOfRoles === 1 ? '' : 's' }} / {{ currentPageHuman }} of {{ numPages }} page
        </small>
      </BaseLevel>
      </div>
    </div>
  </div>
</template>
