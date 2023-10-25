<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import CreatePermission from "@/components/CreatePermission.vue";
import { permissionsToPermissionAdd } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToPermissionCreate = currentUserPermissions !== null && permissionsToPermissionAdd.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CreatePermission v-if="hasAccessToPermissionCreate" />
      <NoAccess v-if="!hasAccessToPermissionCreate" label="add a new permission" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
