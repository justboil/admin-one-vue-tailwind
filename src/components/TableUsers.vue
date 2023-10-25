<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import CardBoxModalStateChanging from "@/components/CardBoxModalStateChanging.vue";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useUserStore } from "@/stores/user";
import CardBoxModal from "./CardBoxModal.vue";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { useRoleStore } from "@/stores/role";
import { capitalizeFirstLetter, formatDate, perPageOptions, permissionsToRoleEdit, permissionsToUserAdd } from "@/commons/constant";
import { mdiEye, mdiPlus, mdiTrashCan, mdiTableBorder } from "@mdi/js";

const userStore = useUserStore();
const roleStore = useRoleStore();

const currentUserId = localStorage.getItem('userId');
const currentUserRoleName = localStorage.getItem('roleName');
const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));

const hasAccessToEditRoles = permissionsToRoleEdit.some(permission => currentUserPermissions.includes(permission));
const hasAccessToCreateUser = permissionsToUserAdd.some(permission => currentUserPermissions.includes(permission));

const modalChangeType = ref("");
const currentUser = ref(null);
const noOfUsers = ref(0);
const referenceId = ref(null);
const isModalOpen = ref(false);
const isLoading = ref(true);
const perPage = ref(10);
const currentPage = ref(0);

const defaultEmailSelected = 'all';
const defaultRoleSelected = 'all';

const users = ref([]);
const userList = ref([]);
const roleList = ref([]);
const filteredRoleList = ref([]);


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
  fetchUsers(getFilters());
};

async function fetchRoles() {
  isLoading.value  = true;
  try {
    const response = await roleStore.roles({ all: true });
    roleList.value = response.data;
    filteredRoleList.value = roleList.value.filter((role) => role.is_user === 1)
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value  = false;
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

async function fetchUsers(filters) {
  isLoading.value = true;
  try {
    const response = await userStore.usersSummary({
      ...filters,
      limit: perPage.value,
      offset: currentPage.value * perPage.value,
    });

    users.value = response.users;
    numPages.value = Math.ceil(response.count / perPage.value);
    noOfUsers.value = response.count;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

const getFilters = () => {
  let filters = {};
  const emailSelect = document.getElementById('email');
  if (emailSelect && emailSelect.value !== defaultEmailSelected) {
    filters = { ...filters, 'email': emailSelect.value };
  }

  const roleSelect = document.getElementById('role');
  if (roleSelect && roleSelect.value !== defaultRoleSelected) {
    filters = { ...filters, 'role_id': roleSelect.value };
  }

  return filters;
};

watch(perPage, async () => {
  currentPage.value = 0;
  await nextTick();
  await fetchUsers(getFilters());
});

onMounted(async () => {
  await fetchRoles();
  await fetchAllUsers();
  await fetchUsers(getFilters());

});

const openModal = (type, user, refId) => {
  currentUser.value = user;
  referenceId.value = refId;
  modalChangeType.value = type;
  isModalOpen.value = true;
};

const updateSearch = () => {
  fetchUsers(getFilters());
}

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
  fetchUsers(getFilters());
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
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Users" main>
        <div v-if="hasAccessToCreateUser">
          <BaseButton
            href="/user/create"
            :icon="mdiPlus"
            label="Add User"
            color="contrast"
            rounded-full
            small
          />
        </div>
      </SectionTitleLineWithButton>
      <CardBox>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <label for="email">Email:</label>
            <select id="email" v-if="userList[0]"
              class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="defaultEmailSelected" @change="updateSearch()" small>
              <option value="all">All</option>
              <option v-for="user in userList" :key="user.id" :value="user.email">
                {{ user.email }}
              </option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="role">Role:</label>
            <select id="role" v-if="filteredRoleList[0]"
              class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="defaultRoleSelected" @change="updateSearch()" small>
              <option value="all">All</option>
              <option
                v-for="role in filteredRoleList"
                :key="role.id"
                :value="role.id"
              >
                {{ role.name }}
              </option>
            </select>
          </div>
        </div>
      </CardBox>
    </div>
    <br />
    <div class="grid overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th class="text-center">Joined On</th>
            <th class="whitespace-nowrap">Approved By</th>


            <th class="text-center" v-if="currentUserRoleName === 'admin'"> Approved On</th>
            <th class="text-center">Status</th>
            <th>Actions</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td data-label="Name" class="whitespace-nowrap">
              {{ user.name }}
            </td>

            <td data-label="Email" class="whitespace-nowrap">
              {{ user.email }}
            </td>

            <td data-label="Role" class="whitespace-nowrap">
              <div v-if="hasAccessToEditRoles">
                <select v-if="filteredRoleList[0]"
                  class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="user.role_id"
                  @change="openModal('role', user, $event.target.value)"
                  small
                >
                  <option
                    v-for="role in filteredRoleList"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ capitalizeFirstLetter(role.name) }}
                  </option>
                </select>
              </div>
              <div v-else>
                {{ capitalizeFirstLetter(user.role) }}
              </div>
            </td>

            <td data-label="Joined On" class="whitespace-nowrap">
              {{formatDate(user.created_at)}}
            </td>

            <td data-label="Approved By" class="whitespace-nowrap">
              {{ (userList.find(u => u.id === user.approvedBy) || {}).name || '-' }}
            </td>

            <td data-label="Approved On" class="whitespace-nowrap" v-if="currentUserRoleName == 'admin'">
              {{ user.approved_at ? user.approved_at : '-' }}
            </td>

            <td data-label="Status" class="whitespace-nowrap text-center">
              <div v-if="hasAccessToEditRoles">
                <div v-if="user.approved_at !== null">
                  <BaseButtons type="justify-start lg:justify-center" no-wrap>
                    <BaseButton
                      color="warning"
                      label="Deactivate"
                      small
                      @click="openModal('status', user, $event.target.value)"
                    />
                  </BaseButtons>
                </div>
                <div v-else>
                  <BaseButtons type="justify-start lg:justify-center" no-wrap>
                    <BaseButton
                      color="info"
                      label="Activate"
                      small
                      @click="openModal('status', user, $event.target.value)"
                    />
                  </BaseButtons>
                </div>
              </div>
              <div v-else>
                <div v-if="user.approved_at !== null">
                  Active
                </div>
                <div v-else>
                  -
                </div>
              </div>
            </td>

            <td class="before:hidden lg:w-1 whitespace-nowrap text-center">
              <div v-if="['all', user.role+':edit'].some(permission => currentUserPermissions.includes(permission))">
                <BaseButtons type="justify-center lg:justify-center" no-wrap>
                  <!-- <BaseButton
                    :to="'/user/'+user.id"
                    color="info"
                    :icon="mdiEye"
                    small
                  /> -->
                  <div v-if="user.role_id != parseInt(currentUserId)">
                    <BaseButton
                      color="danger"
                      :icon="mdiTrashCan"
                      small
                      @click="openModal('delete', user, $event.target.value)"
                    />
                  </div>
                </BaseButtons>
              </div>
              <div v-else> -</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
          {{ noOfUsers }} user{{ noOfUsers === 1 ? '' : 's' }} / {{ currentPageHuman }} of {{ numPages }} page
        </small>
      </BaseLevel>
    </div>

    <CardBoxModalStateChanging v-if="currentUser" v-model="isModalOpen" title="Update the User" button-label="Yes"
      has-cancel modal-type="user" :change="modalChangeType" :id="currentUser.id" :reference-id="referenceId"
      :callback="handleCallback">
      <p>
        {{
          modalChangeType === 'role'
            ? 'Are you sure you want to change user role ?'
            : modalChangeType === 'status'
              ? 'Are you sure you want to change user status ?'
              : modalChangeType === 'delete'
              ? 'Are you sure you want to delete the user ?'
              : ""
        }}
      </p>
    </CardBoxModalStateChanging>
    <CardBoxModal v-model="isOpenConfirmationModal" title="" :button="confirmationBtn">
      {{ confirmationTitle }}
    </CardBoxModal>
  </div>
</template>
