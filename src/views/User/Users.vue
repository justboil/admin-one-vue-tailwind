<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableUsers from "@/components/TableUsers.vue";
import { permissionsToUserView } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToUserView = currentUserPermissions !== null && permissionsToUserView.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <TableUsers v-if="hasAccessToUserView" />
      <NoAccess v-if="!hasAccessToUserView" label="view users" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
