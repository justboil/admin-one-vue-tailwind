<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import CreateMemberToProject from "@/components/CreateMemberToProject.vue";
import { permissionsToAddMembersProject } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToAddMemberToProject = currentUserPermissions !== null && permissionsToAddMembersProject.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CreateMemberToProject v-if="hasAccessToAddMemberToProject" />
      <NoAccess v-if="!hasAccessToAddMemberToProject" label="add member the project" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
