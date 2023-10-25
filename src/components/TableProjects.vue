<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { useProjectStore } from "@/stores/project";
import CardBoxModalStateChanging from "@/components/CardBoxModalStateChanging.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useStatusStore } from "@/stores/status";
import { useUserStore } from "@/stores/user";
import { usePriorityStore } from "@/stores/priorities";
import CardBoxModal from "./CardBoxModal.vue";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiPlus, mdiTrashCan, mdiBriefcase, mdiPencil } from "@mdi/js";
import { permissionsToProjectAdd, permissionsToProjectDelete, permissionsToProjectEdit } from "@/commons/constant";

const projectStore = useProjectStore();
const statusStore = useStatusStore();
const priorityStore = usePriorityStore();
const userStore = useUserStore();

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToProjectCreate = currentUserPermissions !== null && permissionsToProjectAdd.some(permission => currentUserPermissions.includes(permission));
const hasAccessToProjectDelete = currentUserPermissions !== null && permissionsToProjectDelete.some(permission => currentUserPermissions.includes(permission));
const hasAccessToProjectEdit = currentUserPermissions !== null && permissionsToProjectEdit.some(permission => currentUserPermissions.includes(permission));

const modalChangeType = ref("");
const currentProject = ref(null);
const noOfProjects = ref(0);
const referenceId = ref(null);
const isModalOpen = ref(false);
const isLoading = ref(true);
const perPage = ref(10);
const currentPage = ref(0);
const checkedRows = ref([]);

const userList = ref([]);
const statusList = ref([]);
const priorityList = ref([]);

const defaultCreatedBySelected = 'all';
const defaultAssignedToSelected = 'all';
const defaultStatusSelected = 'all';
const defaultPrioritySelected = 'all';
const defaultSelectedPriorityId = 4; //urgent
const sortBy = 'priority_id';
const sort = 'desc';

const projects = ref([]);
const numPages = ref(0);
const currentPageHuman = computed(() => currentPage.value + 1);
const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];
  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });
  return newArr;
};

const checked = (isChecked, project) => {
  if (isChecked) {
    checkedRows.value.push(project);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === project.id
    );
  }
};

const goToPage = (page) => {
  isLoading.value = true;
  currentPage.value = page;
  fetchProjects(getFilters());
};

async function fetchProjects(filters) {
  isLoading.value = true;
  try {
    const response = await projectStore.projectsSummary({
      ...filters,
      limit: perPage.value,
      offset: currentPage.value * perPage.value,
    });

    projects.value = response.data;
    numPages.value = Math.ceil(response.count / perPage.value);
    noOfProjects.value = response.count;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}

async function fetchUsers() {
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

async function fetchStatus() {
  isLoading.value = true;
  try {
    const response = await statusStore.statuses({ all: true });
    statusList.value = response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}

async function fetchPriorities() {
  isLoading.value = true;
  try {
    const response = await priorityStore.priorities({ all: true });
    priorityList.value = response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}

const getFilters = () => {
  let filters = {};
  const createdBySelect = document.getElementById('createdBy');
  if (createdBySelect && createdBySelect.value !== defaultCreatedBySelected) {
    filters = { ...filters, 'created_by': createdBySelect.value };
  }

  const prioritySelect = document.getElementById('priority');
  if (prioritySelect && prioritySelect.value !== defaultPrioritySelected) {
    filters = { ...filters, 'priority_id': prioritySelect.value };
  }

  const statusSelect = document.getElementById('status');
  if (statusSelect && statusSelect.value !== defaultStatusSelected) {
    filters = { ...filters, 'status_id': statusSelect.value };
  }

  const assignToUserSelect = document.getElementById('assignedTo');
  if (assignToUserSelect && assignToUserSelect.value !== defaultAssignedToSelected) {
    filters = { ...filters, 'assigned_to_user_id': assignToUserSelect.value };
  }

  const sortBySelect = document.getElementById('sortBy');
  const sortSelect = document.getElementById('sort');
  if (sortSelect && sortBySelect) {
    filters = { ...filters, 'sort': [`${sortBySelect.value}:${sortSelect.value}`, 'id:desc'] };
  }

  return filters;
};

watch(perPage, async () => {
  currentPage.value = 0;

  await nextTick();
  fetchProjects(getFilters());
});

onMounted(async () => {
  await fetchUsers();
  await fetchStatus();
  await fetchPriorities();
  await fetchProjects({ 'priority_id': defaultSelectedPriorityId, 'sort': ['id:desc', `${sortBy}:${sort}`] });

});

const openModal = (type, project, refId) => {
  currentProject.value = project;
  referenceId.value = refId;
  modalChangeType.value = type;
  isModalOpen.value = true;
};

const updateSearch = () => {
  fetchProjects(getFilters());
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
  fetchProjects(getFilters());
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
      <SectionTitleLineWithButton :icon="mdiBriefcase" title="Projects" main>
        <BaseButton
          href="/project/create"
          :icon="mdiPlus"
          label="Add Project"
          color="contrast"
          rounded-full
          small
          v-if="hasAccessToProjectCreate"
        />
      </SectionTitleLineWithButton>
      <CardBox>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label for="createdBy">Created By:</label>
            <select id="createdBy" v-if="userList[0]"
              class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="defaultCreatedBySelected" @change="updateSearch()" small>
              <option value="all">All</option>
              <option v-for="user in userList" :key="user.id" :value="user.id">
                <span>{{ user.name }} &lt;&lt; {{ user.email }} &gt;&gt;</span>
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="priority">Priority:</label>
            <select id="priority" v-if="priorityList[0]" name="priority"
              class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="defaultSelectedPriorityId" @change="updateSearch()" small>
              <option value="all">All</option>
              <option v-for="priority in priorityList" :key="priority.id" :value="priority.id">
                {{ priority.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="status">Status:</label>
            <select id="status" v-if="statusList[0]"
              class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="defaultStatusSelected" @change="updateSearch()" small>
              <option value="all">All</option>
              <option v-for="status in statusList" :key="status.id" :value="status.id">
                {{ status.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="assignedTo">Assigned To:</label>
            <select id="assignedTo" v-if="userList[0]"
              class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="defaultAssignedToSelected" @change="updateSearch()" small>
              <option value="all">All</option>
              <option v-for="user in userList" :key="user.id" :value="user.id">
                <span v-if="user.id === 'all'">{{ user.name }}</span>
                <span v-else>{{ user.name }} &lt;&lt; {{ user.email }} &gt;&gt;</span>
              </option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-end mt-4">
          <label for="SortBy" class="mr-4">Sort :</label>
          <select id="sortBy"
            class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline mr-4"
            v-model="sortBy" @change="updateSearch()" small>
            <option value="assigned_to_user_id">Assigned User</option>
            <option value="created_by">Created By</option>
            <option value="priority_id" selected>Priority</option>
            <option value="status_id">Status</option>
          </select>
          <select id="sort"
            class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline"
            v-model="sort" @change="updateSearch()" small>
            <option value="asc" selected>ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </CardBox>
    </div>
    <br />
    <div class="grid">
      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <CardBox v-for="project in projects" :key="project.id">
          <div class="space-y-3">
            <div>
              <div class="mb-3 w-full" v-if="hasAccessToProjectEdit">
                <router-link
                  :to="{ name: 'ProjectDetails', params: { id: project.id } }"
                  class="hover:bg-gray-900 w-full"
                >
                  <b>
                    <CardBoxComponentTitle :title="project.name" :icon="mdiPencil" />
                  </b>
                </router-link>
                {{ project.description }}
              </div>
              <div class="mb-3 w-full" v-else>
                <CardBoxComponentTitle :title="project.name" />
              </div>

              <div class="flex mb-3 gap-6">
                <div class="flex-1 gap-6">
                  <div class="mb-1 w-full">
                    <b>Status</b>
                  </div>
                  <div class="mb-3 w-full">
                    <div v-if="hasAccessToProjectEdit">
                      <select v-model="project.status_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        @change="openModal('status', project, $event.target.value)" small>
                        <option v-for="status in statusList" :key="status.id" :value="status.id">
                          {{ status.name }}
                        </option>
                      </select>
                    </div>
                    <div v-else>
                      {{ statusList.find(status => status.id === project.status_id).name }}
                    </div>
                  </div>
                </div>

                <div class="flex-1 gap-6 text-right">
                  <div class="mb-1 w-full">
                    <b>Priority</b>
                  </div>
                  <div class="mb-3 w-full">
                    <div v-if="hasAccessToProjectEdit">
                      <select v-model="project.priority_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        @change="openModal('priority', project, $event.target.value)" small>
                        <option v-for="priority in priorityList" :key="priority.id" :value="priority.id">
                          {{ priority.name }}
                        </option>
                      </select>
                    </div>
                    <div v-else>
                      {{ priorityList.find(priority => priority.id === project.priority_id).name }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="gap-6 mb-3">
                <div class="mb-2 w-full">
                  <label><b>Progress</b></label>
                </div>
                <div class="mb-3">
                  <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="project.progress">
                  {{ project.progress }}
                </progress>
                </div>
              </div>

              <div class="flex mb-3">
                <div class="flex-1 gap-6">
                  <div class="mb-1 w-full">
                    <b>Start Date</b>
                  </div>
                  <div class="mb-3 w-full">
                    {{ project.start_date }}
                  </div>
                </div>
                <div class="flex-1 gap-6 text-right">
                  <div class="mb-1 w-full">
                    <b>End Date</b>
                  </div>
                  <div class="mb-3 w-full">
                    {{ project.end_date !== null ? project.end_date : '-' }}
                  </div>
                </div>
              </div>

              <div class="flex mb-3">
                <div class="flex-1 gap-6">
                  <div class="mb-3 w-full">
                    <b>Created By</b>
                  </div>
                  <div class="mb-3 w-full">
                    {{ project.userDetails.name }}
                  </div>
                </div>
                <div class="flex-1 gap-6 text-right">
                  <div class="flex-1 gap-6">
                    <div class="mb-3 w-full">
                      <b>Assigned To</b>
                    </div>
                    <div class="mb-3 w-full">
                      <div v-if="hasAccessToProjectEdit">
                        <select v-if="userList[0]"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          v-model="project.assigned_to_user_id"
                          @change="openModal('assigned_to', project, $event.target.value)" small>
                          <option value="">Unassign User</option>
                          <option v-for="user in userList" :key="user.id" :value="user.id">
                            {{ user.email }}
                          </option>
                        </select>
                      </div>
                      <div v-else>
                        {{ project.assigned_to_user_id !== null ? userList.find(user => user.id === project.assigned_to_user_id)?.email : 'Not Assinged' }}
                      </div>
                    </div>
                  </div>
                  <!-- <div class="mb-1 w-full">
                    <b>Assigned To</b>
                  </div>
                  <div class="mb-3 w-full">
                    <div v-if="hasAccessToProjectEdit">
                      <select v-if="userList[0]"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="project.assigned_to_user_id"
                        @change="openModal('assigned_to', project, $event.target.value)" small>
                        <option value="">Unassign User</option>
                        <option v-for="user in userList" :key="user.id" :value="user.id">
                          {{ user.email }}
                        </option>
                      </select>
                    </div>
                    <div v-else>
                      {{ project.assigned_to_user_id !== null ? userList.find(user => user.id === project.assigned_to_user_id) : 'Not Assinged' }}
                    </div>
                  </div> -->
                </div>

              </div>

              <div class="mb-3 w-full">
                <div class="text-right">
                  <BaseButton
                  color="danger"
                  :icon="mdiTrashCan"
                  small
                  @click="openModal('delete', project, $event.target.value)"
                  v-if="hasAccessToProjectDelete"
                />
                </div>
              </div>
            </div>
          </div>
        </CardBox>
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
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            {{ noOfProjects }} project{{ noOfProjects === 1 ? '' : 's' }} / {{ currentPageHuman }} of {{ numPages }} page
          </small>
        </BaseLevel>
      </div>
      <CardBoxModalStateChanging v-if="currentProject" v-model="isModalOpen" title="Update the Project" button-label="Yes"
        has-cancel modal-type="project" :change="modalChangeType" :id="currentProject.id" :reference-id="referenceId"
        :callback="handleCallback">
        <p>
          {{ modalChangeType === 'delete'
            ? 'Are you sure you want to delete the project'
            : modalChangeType === 'assigned_to'
              ? referenceId === ''
                ? 'Are you sure you want to unassign the current user from this project?'
                : 'Are you sure you want to assign the selected user to this project?'
              : `Are you sure you want to change the ${modalChangeType === 'status' ? 'status' : 'priority'}?`
          }}
        </p>
      </CardBoxModalStateChanging>
      <CardBoxModal v-model="isOpenConfirmationModal" title="" :button="confirmationBtn">
        {{ confirmationTitle }}
      </CardBoxModal>
    </div>
  </div>
</template>
