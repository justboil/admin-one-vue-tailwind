<script setup>
import { computed, ref } from "vue";
import { mdiClose } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import { useProjectStore } from "@/stores/project";
import { useUserStore } from "@/stores/user";
import { useRoleStore } from "@/stores/role";

const projectStore = useProjectStore();
const userStore = useUserStore();
const roleStore = useRoleStore();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  modalType: String,
  change: String,
  id: [String, Number],
  referenceId: [String, Number],
  callback: Function,
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};

const result = ref(null);

const confirm = async () => {
  confirmCancel("confirm");
  try {
    if (props.modalType === 'project') {
      if (props.change === 'delete') {
        const response = await projectStore.deleteProject(props.id);
        props.callback(response);
        return response;
      } else {
        const data = {};
        data[
          props.change == 'status'
            ? 'status_id'
            : props.change == 'priority'
              ? 'priority_id'
              : 'assigned_to_user_id'
          ] = props.referenceId;

        const response = await projectStore.updateProject(data, props.id);
        props.callback(response);
        return response;
      }
    } else if (props.modalType === 'user') {
      const data = {};

      if (props.change === 'status') {
        const response = await userStore.activateDeactivateUser(props.id);
        props.callback(response);
        return response;
      } else if (props.change === 'role') {
        data['role_id'] = props.referenceId;
        const response = await userStore.updateUserRole(data, props.id);
        props.callback(response);
        return response;
      } else if (props.change === 'delete') {
        const response = await userStore.deleteUser(props.id);
        props.callback(response);
        return response;
      } else {
        return null;
      }
    } else if (props.modalType === 'role') {
      const data = {};

      if (props.change === 'is_user') {

        data[props.change] = props.referenceId;
        const response = await roleStore.updateRole(data, props.id);
        props.callback(response);
        return response;
      } else if (props.change === 'delete') {
        const response = await roleStore.deleteRole(props.id);
        props.callback(response);
        return response;
      } else {
        return null;
      }
    }
  } catch (error) {
    props.callback(error);
    return error;
  }
};

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50"
      is-modal
    >
      <CardBoxComponentTitle :title="title">
        <BaseButton
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton :label="buttonLabel" :color="button" @click="confirm" />
          <BaseButton
            v-if="hasCancel"
            label="Cancel"
            :color="button"
            outline
            @click="cancel"
          />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
