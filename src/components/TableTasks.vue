<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import CardBoxModalStateChanging from "@/components/CardBoxModalStateChanging.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useStatusStore } from "@/stores/status";
import { usePriorityStore } from "@/stores/priorities";
import CardBoxModal from "./CardBoxModal.vue";
import { perPageOptions } from "@/commons/constant";

const taskStore = useTaskStore();
const statusStore = useStatusStore();
const priorityStore = usePriorityStore();

const modalChangeType = ref("");
const currentTask = ref(null);
const referenceId = ref(null);
const isModalOpen = ref(false);
const isLoading = ref(true);
const perPage = ref(2);
const currentPage = ref(0);
const checkedRows = ref([]);

const statusList = ref([]);
const priorityList = ref([]);
const tasks = ref([]);
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

const checked = (isChecked, task) => {
  if (isChecked) {
    checkedRows.value.push(task);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === task.id
    );
  }
};

const goToPage = (page) => {
  isLoading.value = true;
  currentPage.value = page;
  fetchTasks();
};

async function fetchTasks() {
  isLoading.value  = true;
  try {
    const response = await taskStore.tasksSummary({
      limit: perPage.value,
      offset: currentPage.value * perPage.value,
    });

    tasks.value = response.data;
    numPages.value = Math.ceil(response.count / perPage.value);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    setTimeout(() => {
      isLoading.value  = false;
    }, 500);
  }
}

async function fetchStatus() {
  isLoading.value  = true;
  try {
    const response = await statusStore.statuses({ all: true });
    statusList.value = response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value  = false;
  }
}

async function fetchPriorities() {
  isLoading.value  = true;
  try {
    const response = await priorityStore.priorities({ all: true });
    priorityList.value = response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value  = false;
  }
}

watch(perPage, () => {
  currentPage.value = 0;
  fetchTasks();
});



onMounted(() => {
  fetchStatus();
  fetchPriorities();
  fetchTasks();
});

const openModal = (type, task, refId) => {
  currentTask.value = task;
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
      confirmationBtn.value="danger";
    } else {
      confirmationTitle.value = result.data.message;
      confirmationBtn.value="success";
    }
    isOpenConfirmationModal.value = true;
  }
};
</script>

<template>
  <div v-if="isLoading" class="text-center p-4">
    <div class="flex justify-center items-center">
      <div class="w-5 h-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  </div>
  <div v-else>
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
      <CardBox v-for="task in tasks" :key="task.id">
        <div class="space-y-3">
          <table>
            <tbody>
              <tr>
                <td colspan="2" style="width: 100%;">
                  <router-link :to="{ name: 'TaskDetails', params: { id: task.id } }">
                    <b><CardBoxComponentTitle :title="task.name" /></b>
                  </router-link>
                  <!-- <a href="/tasks/{{ task.id }}"><b><CardBoxComponentTitle :title="task.name" /></b></a> -->
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-right: 5px;">Status :</label>
                  <select
                    v-model="task.status_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    @change="openModal('status', task, $event.target.value)"
                    small
                  >
                    <option
                      v-for="status in statusList"
                      :key="status.id"
                      :value="status.id"
                    >
                      {{ status.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <label style="margin-right: 5px;">Priority : </label>
                  <select
                    v-model="task.priority_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    @change="openModal('priority', task, $event.target.value)"
                    small
                  >
                    <option
                      v-for="priority in priorityList"
                      :key="priority.id"
                      :value="priority.id"
                    >
                      {{ priority.name }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <b>Progress</b>
                  <progress
                    class="flex w-2/5 self-center lg:w-full"
                    max="100"
                    :value="task.progress"
                  >
                    {{ task.progress }}
                  </progress>
                </td>
              </tr>
              <tr>
                <td class="text-start">
                  <label>Start Date</label><br>
                  {{ task.start_date }}
                </td>
                <td class="text-end">
                  <label>End Date</label><br>
                  {{ task.end_date !== null ? task.end_date : '-' }}
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    <b>Created By</b> : <br>
                    {{ task.userDetails.name }}
                  </p>
                </td>
                <td>
                  <p>
                    <b>Currently working</b> : <br>
                    {{ task.assigned_to_user_id ? task.assignedUserDetails.name : 'Not Assigned' }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBox>
    </div>

    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="goToPage(page)"
          />
        </BaseButtons>
        <small>
          Per Page
          <select
            v-model="perPage"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="perPage"
          >
          <option v-for="perPage in perPageOptions" :key="perPage" :value="perPage">{{ perPage }}</option>
          </select>
          {{ currentPageHuman }} of {{ numPages }}
        </small>
      </BaseLevel>
    </div>
    <CardBoxModalStateChanging
      v-if="currentTask"
      v-model="isModalOpen"
      title="Change Confirmation"
      button-label="Yes"
      has-cancel
      modal-type="task"
      :change="modalChangeType"
      :id="currentTask.id"
      :reference-id="referenceId"
      :callback="handleCallback"
    >
      <p>
        Are you sure you want to change the {{ modalChangeType === 'status' ? 'status' : 'priority' }}?
      </p>
    </CardBoxModalStateChanging>
    <CardBoxModal
      v-model="isOpenConfirmationModal"
      title=""
      :button="confirmationBtn"
    >
    {{ confirmationTitle }}
    </CardBoxModal>
  </div>
</template>
