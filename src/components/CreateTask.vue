<script setup>
import { ref, onMounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import { useStatusStore } from "@/stores/status";
import { usePriorityStore } from "@/stores/priorities";
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
import BaseButtons from "./BaseButtons.vue";
import BaseButton from "./BaseButton.vue";
import { useProjectStore } from "@/stores/project";

const statusStore = useStatusStore();
const priorityStore = usePriorityStore();
const projectStore = useProjectStore();

const isLoading = ref(true);

const statusList = ref([]);
const priorityList = ref([]);
const projectList = ref([]);

const startDate = ref(null);
const endDate = ref(null);

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

const accesptedStatusList = ['Open', 'In Progress', 'On Hold', 'Overdue'];
async function fetchProjects() {
  isLoading.value  = true;
  try {
    const response = await projectStore.projectNames(
      {
        status: accesptedStatusList,
        all: true
      }
    );

    projectList.value = response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  } finally {
    isLoading.value  = false;
  }
}

onMounted(() => {
  fetchStatus();
  fetchPriorities();
  fetchProjects();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  startDate.value = `${year}-${month}-${day}`;
  const nextMonth = new Date(year, currentDate.getMonth() + 1, day);
  const nextYear = nextMonth.getFullYear();
  const nextMonthFormatted = String(nextMonth.getMonth() + 1).padStart(2, '0');
  endDate.value = `${nextYear}-${nextMonthFormatted}-${day}`;
});

const handleCallback = (result) => {
  console.log("Handle Call Back");
  return null;
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
      <CardBox form @submit.prevent="submit">
        <FormField label="Task Name">
          <FormControl type="text" />
        </FormField>
        <FormField label="Related Project">
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            small
          >
            <option
              v-for="project in projectList"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </FormField>
        <FormField label="Description" help="Describe the task in short">
          <FormControl
            type="textarea"
            placeholder="Describe the task"
          />
        </FormField>
        <FormField>
          <FormField label="Start Date">
            <FormControl type="date" name="start_date" v-model="startDate" />
          </FormField>
          <FormField label="End Date">
            <FormControl type="date" name="end_date" v-model="endDate" />
          </FormField>
        </FormField>
        <FormField>
          <FormField label="Status">
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          </FormField>
          <FormField label="Priority">
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          </FormField>
        </FormField>
        <FormField label="Assign to">
          <input type="search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="type at least 3 characters to find a user email" required>
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </div>
  </div>
</template>
