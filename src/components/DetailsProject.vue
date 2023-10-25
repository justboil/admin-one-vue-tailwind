<script setup>
import { computed, ref, onMounted } from "vue";
import { useProjectStore } from "@/stores/project";
import CardBoxModalStateChanging from "@/components/CardBoxModalStateChanging.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useStatusStore } from "@/stores/status";
import { useUserStore } from "@/stores/user";
import { usePriorityStore } from "@/stores/priorities";
import CardBoxModal from "./CardBoxModal.vue";
import SectionMain from "./SectionMain.vue";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton.vue";
import { mdiPlus, mdiTrashCan, mdiTableBorder, mdiBriefcase } from "@mdi/js";
import { useRoute } from 'vue-router';
import { removeNullProperties, removeZeroProperties, formatDate, percentageArray, isImageFile } from "@/commons/constant";

const route = useRoute();

const projectStore = useProjectStore();
const statusStore = useStatusStore();
const priorityStore = usePriorityStore();
const userStore = useUserStore();

const modalChangeType = ref("");
const currentProject = ref(null);
const referenceId = ref(null);
const isModalOpen = ref(false);
const isLoading = ref(true);
const userList = ref([]);
const statusList = ref([]);
const priorityList = ref([]);

const project = ref(null);
const projectHistory = ref(null);
const projectHistoryGroupByDate = ref(null);
const processedProjectHistory = ref(null);
const projectCommentList = ref([]);
const projectAttachmentList = ref([]);

const newComment = ref('');
const newDescription = ref('');
const newName = ref('');
const progress = ref(0);
const startDate = ref(null);
const endDate = ref(null);
const errorMsg = ref('');

const fileInputCount = ref(0);

const readFile = ref('');

async function fetchProject() {
  const projectId = route.params.id;
  isLoading.value = true;
  try {
    const response = await projectStore.viewProject(projectId);
    project.value = response.data;
    projectHistory.value = response.data.history;
    processedProjectHistory.value = response.data.history;
    projectCommentList.value = response.data.comments;
    projectAttachmentList.value = response.data.attachments;
    progress.value = response.data.progress;
    startDate.value = response.data.start_date;
    endDate.value = response.data.end_date;
    const grouped = {};
    response.data.history.forEach((record) => {
      const created_at = formatDate(record.created_at);
      if (!grouped[created_at]) {
        grouped[created_at] = [];
      }
      grouped[created_at].push(record);
    });
    projectHistoryGroupByDate.value = grouped;
    for (const pph in processedProjectHistory.value) {
      removeNullProperties(processedProjectHistory.value[pph])
      removeZeroProperties(processedProjectHistory.value[pph])
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

onMounted(async () => {
  await fetchUsers();
  await fetchStatus();
  await fetchPriorities();
  await fetchProject();
});

const openModal = (type, project, refId) => {
  currentProject.value = project;
  referenceId.value = refId;
  modalChangeType.value = type;
  isModalOpen.value = true;
};

const updateSearch = () => {
  fetchProject();
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
  fetchProject();
};

const updateFileInputCount = () => {
  const fileInput = document.querySelector('#attachment');
  fileInputCount.value = fileInput.files.length;
};

const submitComment = async () => {
  errorMsg.value = '';

  const formData = new FormData();
  const fileInput = document.querySelector('#attachment');
  const selectedFiles = fileInput.files;

  if (newComment.value !== '') {
    formData.append('comment', newComment.value);
  }

  if (selectedFiles.length > 0) {
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('attachments[]', selectedFiles[i]);
    }
  }

  if (startDate.value !== project.value.start_date) {
    formData.append('start_date', startDate.value);
  }

  if (endDate.value !== project.value.end_date) {
    formData.append('end_date', endDate.value);
  }

  if (progress.value !== project.value.progress) {
    formData.append('progress', progress.value);
  }

  if (newName.value !== '' && newName.value !== project.value.name) {
    formData.append('name', newName.value);
  }

  if (newDescription.value !== '' && newDescription.value !== project.value.description) {
    formData.append('description', newDescription.value);
  }

  if (
      !formData.has('comment') &&
      selectedFiles.length === 0 &&
      startDate.value === project.value.start_date &&
      endDate.value === project.value.end_date &&
      newName.value === project.value.name &&
      newDescription.value === project.value.description &&
      progress.value === project.value.progress
    ) {
    errorMsg.value = "Fill at least one criterion to update the project";
    return;
}

  try {
    const response = await projectStore.addCommentToProject(formData, project.value.id);
    newName.value = '';
    newDescription.value = '';
    newComment.value = '';
    fetchProject();
  } catch (error) {
    errorMsg.value = "An error occurred while adding the new comment. Please try again later.";
  }
}

</script>

<template>
  <SectionMain>
    <div v-if="isLoading" class="text-center p-4">
      <div class="flex justify-center items-center">
        <div class="w-5 h-5 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
    <div v-else>
      <div v-if="project">
        <SectionTitleLineWithButton :icon="mdiBriefcase" :title="project.name" main>
          <BaseButton
            href="/project/create"
            :icon="mdiPlus"
            label="Add Project"
            color="contrast"
            rounded-full
            small
          />
        </SectionTitleLineWithButton>
        <div class="grid grid-cols-1 gap-6 mb-6 ">
          <CardBox :key="project.id">
            <div>
              <div class="flex flex-row gap-6">
                <div class="flex-1">
                  <div class="mb-1 w-full">
                    <b>Status</b>
                  </div>
                  <div class="mb-3 w-full">
                    <select v-model="project.status_id"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      @change="openModal('status', project, $event.target.value)" small>
                      <option v-for="status in statusList" :key="status.id" :value="status.id">
                        {{ status.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="flex-1">
                  <div class="mb-1 w-full">
                    <b>Priority</b>
                  </div>
                  <div class="mb-3 w-full">
                    <select v-model="project.priority_id"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      @change="openModal('priority', project, $event.target.value)" small>
                      <option v-for="priority in priorityList" :key="priority.id" :value="priority.id">
                        {{ priority.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="flex-1">
                  <div class="mb-3 w-full">
                    <b>Start Date</b>
                  </div>
                  <div class="mb-3 w-full">
                    {{ project.start_date }}
                  </div>
                </div>

                <div class="flex-1">
                  <div class="mb-3 w-full">
                    <b>End Date</b>
                  </div>
                  <div class="mb-3 w-full">
                    {{ project.end_date !== null ? project.end_date : '-' }}
                  </div>
                </div>

                <div class="flex-1">
                  <div class="mb-3 w-full">
                    <b>Created By</b>
                  </div>
                  <div class="mb-3 w-full whitespace-nowrap">
                    {{ project.userDetails.name }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="mb-1 w-full">
                    <b>Assigned To</b>
                  </div>
                  <div class="mb-3 w-full">
                    <select v-if="userList[0]"
                      class="select-box bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      v-model="project.assigned_to_user_id"
                      @change="openModal('assigned_to', project, $event.target.value)" small>
                      <option value="">Unassign User</option>
                      <option v-for="user in userList" :key="user.id" :value="user.id">
                        <span v-if="user.id !== 'all'">{{ user.email }}</span>
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <div class="mb-1 w-full"><b>&nbsp;</b></div>
                  <BaseButton
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="openModal('delete', project, $event.target.value)"
                  />
                </div>
              </div>

              <div class="flex-1 gap-6 mb-3">
                <div class="mb-2 w-full">
                  <label><b>Progress</b></label>
                </div>
              </div>

              <div class="flex-1 mb-6">
                <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="project.progress">
                  {{ project.progress }}
                </progress>
              </div>

              <div class="flex-1 gap-6 mb-1">
                <div class="mb-2 w-full">
                  <label><b>Description</b></label>
                </div>
              </div>

              <div class="flex-1">
                {{ project.description }}
              </div>
            </div>
          </CardBox>

          <CardBox v-for="(history, date) in projectHistoryGroupByDate" :key="date" class="text-justify">
            <div v-for="(h, index) in history" :key="h.id" class="flex flex-row gap-6">
              <div class="flex-1 gap-6 mb-3">
                <div v-if="typeof h.name !== 'undefined'">{{ `Project Name - ${h.name}` }}</div>
                <div v-if="typeof h.description !== 'undefined'">{{ `Description - ${h.description}` }}</div>
                <div v-if="typeof h.status_id !== 'undefined'">
                  Status updated to - {{ statusList.find(status => status.id === h.status_id)?.name || 'Status not found' }}
                </div>
                <div v-if="typeof h.priority_id !== 'undefined'">
                  Priority updated to - {{ priorityList.find(priority => priority.id === h.priority_id)?.name || 'Priority not found' }}
                </div>
                <div v-if="typeof h.start_date !== 'undefined'">{{ `Start Date - ${h.start_date}` }}</div>
                <div v-if="typeof h.end_date !== 'undefined'">{{ `End Date - ${h.end_date}` }}</div>
                <div v-if="h.estimated_hours > 0">{{ `Estimated hours - ${h.estimated_hours} hrs` }}</div>
                <div v-if="h.spent_hours > 0">{{ `Spent hours - ${h.spent_hours} hrs` }}</div>
                <div v-if="h.progress > 0">{{ `Progress - ${h.progress}` }}</div>
                <div v-if="typeof h.assigned_to_user_id !== 'undefined'">
                  Assigned To - {{ userList.find(user => user.id === h.assigned_to_user_id)?.name || 'User not found' }}
                </div>
                <div v-if="typeof h.comment_id !== 'undefined'">
                  Comment - {{ projectCommentList.find(comment => comment.id === h.comment_id)?.comment_text || 'Comment not found' }}
                </div>

                <div v-if="typeof h.attachment_id !== 'undefined'">
                  <template v-if="projectAttachmentList.find(attachment => attachment.id === h.attachment_id)">
                    <a v-if="isImageFile(projectAttachmentList.find(attachment => attachment.id === h.attachment_id)?.file_name)"
                      :href="'http://localhost:8000/assets/' + project.id + '/' + projectAttachmentList.find(attachment => attachment.id === h.attachment_id)?.file_name"
                      target="_blank" rel="noopener noreferrer">
                        <div class="image-preview-container">
                          <img :src="'http://localhost:8000/assets/' + project.id + '/' + projectAttachmentList.find(attachment => attachment.id === h.attachment_id)?.file_name" alt="Attachment" class="image-preview">
                        </div>
                    </a>
                    <a v-else
                      :href="'http://localhost:8000/assets/' + project.id + '/' + projectAttachmentList.find(attachment => attachment.id === h.attachment_id)?.file_name"
                      download>
                        {{ projectAttachmentList.find(attachment => attachment.id === h.attachment_id)?.file_name }}
                    </a>
                  </template>
                  <span v-else>
                    File not found
                  </span>
                </div>
              </div>
              <div v-if="index === 0" class="ml-auto text-right">
                Updated by <br /> {{ userList.find(user => user.id === h.user_id)?.name || 'User not found' }} <br /> on  {{ date }}
              </div>
            </div>
          </CardBox>

          <CardBox form @submit.prevent="submitComment">
            <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>
            <div class="flex-1 w-full">
              <label for="completed_progress" class="p-2">Update Project Name: </label>
              <FormControl class="flex-1 mb-3" v-model="newName" placeholder="Update the project Name" />
            </div>
            <div class="flex-1 w-full">
              <label for="completed_progress" class="p-2">Update Project Description: </label>
              <FormControl class="flex-1 mb-3" type="textarea" v-model="newDescription" placeholder="Update the project Description" />
            </div>
            <div class="flex mb-3 gap-6">
              <div class="flex-1 w-full">
                <label for="completed_progress" class="p-2">Completed: </label>
                <select
                  id="completed_progress"
                  v-model="progress"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option v-for="i in percentageArray()" :key="i" :value="i">
                    {{ i }} %
                  </option>
                </select>
              </div>
              <div class="flex-1 w-full">
                <label for="completed_progress" class="p-2">Start Date: </label>
                <FormControl type="date" v-model="startDate" />
              </div>
              <div class="flex-1 w-full">
                <label for="completed_progress" class="p-2">End Date: </label>
                <FormControl type="date" v-model="endDate" />
              </div>
            </div>
            <div class="flex flex-rows">
              <FormControl class="flex-1 mb-3" type="textarea" v-model="newComment" placeholder="Add a comment on the project" />
            </div>
            <!-- Image Upload Start -->
            <div class="flex items-center justify-center w-full">
              <label for="attachment" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <div v-if="fileInputCount > 0"> {{ fileInputCount }} file(s) selected</div>
                </div>
                <input id="attachment" type="file" multiple class="hidden" name="attachment[]" @change="updateFileInputCount" />
              </label>
            </div>
            <!-- Image Upload End -->

            <template #footer>
              <BaseButtons class="flex justify-end">
                <BaseButton type="submit" color="success" label="Update the Project"  @click="submitComment" />
              </BaseButtons>
            </template>
          </CardBox>
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
      <div v-else>
        <p class="text-center">Project could not found!!! Please contact the administrator</p>
      </div>
    </div>
  </SectionMain>

</template>

<style>
.image-preview {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
