<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableRoles from "@/components/TableRoles.vue";
import { permissionsToRoleView } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToRoleView = currentUserPermissions !== null && permissionsToRoleView.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <TableRoles v-if="hasAccessToRoleView" />
      <NoAccess v-if="!hasAccessToRoleView" label="view roles" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
