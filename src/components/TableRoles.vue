<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiEye, mdiPencil, mdiPlus, mdiTableBorder, mdiTrashCan } from "@mdi/js";
import { perPageOptions } from "@/commons/constant";
import { useRoleStore } from "@/stores/role";
import { useUserStore } from "@/stores/user";
import CardBoxModalStateChanging from "./CardBoxModalStateChanging.vue";
import CardBoxModal from "./CardBoxModal.vue";

const roleStore = useRoleStore();
const userStore = useUserStore();
const excludedRoleNames = ref(['admin', 'manager', 'employee', 'user-own', 'projects', 'tasks', 'roles', 'permissions' ]);

const modalChangeType = ref("");
const currentRole = ref(null);
const noOfRoles = ref(0);
const referenceId = ref(null);
const isModalOpen = ref(false);
const isLoading = ref(true);
const perPage = ref(10);
const currentPage = ref(0);


const sortBy = 'priority_id';
const sort = 'asc';

const roles = ref([]);
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
  fetchRoles(getFilters());
};

async function fetchRoles(filters) {
  isLoading.value = true;
  try {
    const response = await roleStore.roles({
      ...filters,
      limit: perPage.value,
      offset: currentPage.value * perPage.value,
    });

    roles.value = response.data;
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
  fetchRoles(getFilters());
});

onMounted(async () => {
  await fetchAllUsers();
  await fetchRoles({'sort': ['id:desc'] });

});

const openModal = (type, role, refId) => {
  currentRole.value = role;
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
      confirmationTitle.value = result.message;
      confirmationBtn.value = "success";
    }
    isOpenConfirmationModal.value = true;
  }
  fetchRoles(getFilters());
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
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Roles" main>
        <BaseButton
          href="/role/create"
          :icon="mdiPlus"
          label="Add Role"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

    </div>
    <br />
    <div class="grid">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th class="whitespace-nowrap text-center" style="width: 120px;">Is User</th>
            <th class="whitespace-nowrap text-right">Created By</th>
            <th class="whitespace-nowrap text-center">Actions</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td data-label="Role">
              {{ role.name }}
            </td>
            <td data-label="Role">
              {{ role.permissions }}
            </td>
            <td data-label="Role" class="whitespace-nowrap text-center">
              <select
                id="is_user"
                v-model="role.is_user"
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                @change="openModal('is_user', role, $event.target.value)"
                small
              >
                <option value="1"> Yes </option>
                <option value="0"> No </option>
              </select>


            </td>
            <td data-label="CreatedBy" class="text-right">
              {{ (userList.find(u => u.id === role.user_id) || {}).name || '-' }}
            </td>

            <td class="before:hidden lg:w-1 whitespace-nowrap text-right"> <!-- Apply text-center class here -->
              <BaseButtons type="justify-start lg:justify-end" no-wrap>
                <BaseButton
                  color="warning"
                  :icon="mdiPencil"
                  small
                  :to="'role/'+role.id"
                />
                <div v-if="!excludedRoleNames.includes(role.name)">
                  <BaseButton
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="openModal('delete', role, $event.target.value)"
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
          {{ noOfRoles }} role{{ noOfRoles === 1 ? '' : 's' }} / {{ currentPageHuman }} of {{ numPages }} page
        </small>
      </BaseLevel>
      </div>
    </div>
    <CardBoxModalStateChanging v-if="currentRole" v-model="isModalOpen" title="Update the Role" button-label="Yes"
      has-cancel modal-type="role" :change="modalChangeType" :id="currentRole.id" :reference-id="referenceId"
      :callback="handleCallback">
      <p>
        {{
          modalChangeType === 'is_user'
            ? 'Are you sure you want to update the role type ?'
            : modalChangeType === 'delete'
              ? "Are you sure you want to delete the role"
              : ""
        }}
      </p>
    </CardBoxModalStateChanging>
    <CardBoxModal v-model="isOpenConfirmationModal" title="" :button="confirmationBtn">
      {{ confirmationTitle }}
    </CardBoxModal>
  </div>
</template>
