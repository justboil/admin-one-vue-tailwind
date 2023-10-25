<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import CreateProject from "@/components/CreateProject.vue";
import { permissionsToProjectAdd } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToProjectCreate = currentUserPermissions !== null && permissionsToProjectAdd.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CreateProject v-if="hasAccessToProjectCreate" />
      <NoAccess v-if="!hasAccessToProjectCreate" label="add a new project" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
