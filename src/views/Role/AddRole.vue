<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import CreateRole from "@/components/CreateRole.vue";
import { permissionsToRoleAdd } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToProjectAdd = currentUserPermissions !== null && permissionsToRoleAdd.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CreateRole v-if="hasAccessToProjectAdd" />
      <NoAccess v-if="!hasAccessToProjectAdd" label="add a new role" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
