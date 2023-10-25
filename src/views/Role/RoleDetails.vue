<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import DetailsRole from "@/components/DetailsRole.vue";
import { permissionsToRoleEdit } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToProjectEdit = currentUserPermissions !== null && permissionsToRoleEdit.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <DetailsRole v-if="hasAccessToProjectEdit" />
      <NoAccess v-if="!hasAccessToProjectEdit" label="update the role" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
