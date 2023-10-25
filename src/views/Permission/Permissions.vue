<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import TablePermissions from "@/components/TablePermissions.vue";
import { permissionsToPermissionView } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToPermissionView = currentUserPermissions !== null && permissionsToPermissionView.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <TablePermissions v-if="hasAccessToPermissionView" />
      <NoAccess v-if="!hasAccessToPermissionView" label="view permissions" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
